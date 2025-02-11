FROM node:20.11.0-alpine AS build

# 작업 디렉토리 설정
WORKDIR /app

# 루트의 package.json과 yarn.lock 복사
COPY package.json yarn.lock ./

# 루트에서 의존성 설치
RUN yarn install

COPY . .

# 포트 노출
EXPOSE 4000

# 서버 실행 (index.mjs)
CMD ["node", "index.mjs"]
