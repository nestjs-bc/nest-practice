## 1ch TDD
### jest 사용법
- 의존성의 분리
- e2e
### golevelup
- 좋아요
- 지금 사용하려고 하는 inject외에는 전부 mockup 자동
- mockImplementationOnce
### 테크닉 
- --runInBand option
- apo test
  - filter, pipe, interceptor test
  - file upload test

## 2ch 보안
- https://oingdaddy.tistory.com/483
### Broken Access Control
- 접근 권한 무력화 공격
  - json token 위변조
  - 권한 무력화
- 관리자 계정 제한
- throttle
- logging

### 약한 암호화
- salt 
- 강력한 알고리즘

### 인젝션

### 안전하지 않은 설계
- 코드 외에 정책 설계 자체의 미흡
- ex ) 질문답변을 통한 비번찾기
- ex ) 공연 좌석 예약 시스템 등에서 bulk 예약 후 제약 없어서 큰 손해를 입는 경우
- ex ) 비디오카드 리셀러 대량 독점 사태
  - 봇에 의한 구매, 접근 방지 디자인 필요

### 보안 설정 실수
- ex )
  - 디폴트 시스템을 안지우는 경우
  - 디렉토리구조 노출
  - 자세한 에러 노출
  - 디렉터리 퍼미션
- broken access control 과 왜 이렇게 유사하다는 느낌이 들까?
  - 보안 설정을 잘못하면 access control 제한이 뚫리기 때문이 아닐까?

### 취약한 / 오래된 컴포넌트, 라이브러리
- 특히 IoT 의 경우 펌웨어 업데이트 쉽지 않아 많이 뚫려

### 인증/인가 실패
- 다른 곳에서 뚫린 패스워드 대입 공격
  - credential stuffing attack
  - multi-factor 등 제공 필요
- 세션 타임아웃을 제대로 적용하지 않은 경우
  - 특히 공공장소 브라우저 인증

### software and data integrity failures
- 공급자 경유 공격 
- https://www.igloo.co.kr/security-information/%EC%86%94%EB%9D%BC%EC%9C%88%EC%A6%88solarwinds%EC%99%80-%EC%95%85%EC%84%B1%EC%BD%94%EB%93%9C/
- owasp dep check

### 보안 위반 추적 누락/부족

### SSRF
- CSRF : 클라이언트 브라우저 탈취 후 악성 요청 수행
- SSRF : 접근 제한된 내부환경내에서 추가 공격. 더 위험
- 서비스 서버는 보통 잘 block 되어 있고, webServer와만 통신
  - 근데 webserver가 취약하네?
  - 그럼 여길 통해 마치 localhost 통신처럼 공격