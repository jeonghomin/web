import { PrismaClient } from "@prisma/client";

// 실제 Prisma 클라이언트 생성
const createPrismaClient = () => {
  try {
    console.log("🔗 실제 Prisma 클라이언트 생성 중...");
    return new PrismaClient();
  } catch (error) {
    console.error("❌ Prisma 클라이언트 생성 실패:", error);
    throw error;
  }
};

declare global {
  var prisma: undefined | ReturnType<typeof createPrismaClient>;
}

const prisma = globalThis.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

// 데이터베이스 연결 테스트
prisma
  .$connect()
  .then(() => {
    console.log("✅ 데이터베이스 연결 성공");
  })
  .catch((e) => {
    console.error("❌ 데이터베이스 연결 실패:", e);
  });

export default prisma;
