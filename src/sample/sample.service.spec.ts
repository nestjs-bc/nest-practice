import { Test, TestingModule } from '@nestjs/testing';
import { SampleService } from './sample.service';
import { createMock } from '@golevelup/ts-jest';
import { SomethingReturn } from './util/something-return';

describe('SampleService', () => {
  let service: SampleService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [SampleService, SomethingReturn],
    })
      .useMocker(createMock())
      .compile();

    service = module.get<SampleService>(SampleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('call util', () => {
    const sr: SomethingReturn = module.get<SomethingReturn>(SomethingReturn);
    const sr2: SomethingReturn = module.get<SomethingReturn>(SomethingReturn);

    // @NO
    jest.spyOn(sr, 'something').mockImplementation(() => {
      return [1, 1, 1];
    });

    // @DO
    // jest.spyOn(sr, 'something').mockImplementationOnce(() => {
    //   return [1, 1, 1];
    // });
    //
    // jest.spyOn(sr2, 'something').mockImplementationOnce(() => {
    //   return 'BANANA from abc cde';
    // });

    const result = service.something();

    expect(sr.something).toHaveBeenCalled();
    // expect(sr2.something).toHaveBeenCalled();
    expect(result === 'B').toBeTruthy();
  });
});
