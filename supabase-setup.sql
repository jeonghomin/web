-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create hospital_info table
CREATE TABLE IF NOT EXISTS "hospital_info" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "representative" TEXT NOT NULL,
    "businessNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addressDetail" TEXT,
    "parkingInfo" TEXT,
    "mainPhone" TEXT NOT NULL,
    "specialtyPhone" TEXT,
    "weekdayOpen" TEXT NOT NULL,
    "weekdayClose" TEXT NOT NULL,
    "saturdayOpen" TEXT,
    "saturdayClose" TEXT,
    "lunchStart" TEXT NOT NULL,
    "lunchEnd" TEXT NOT NULL,
    "closedDays" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hospital_info_pkey" PRIMARY KEY ("id")
);

-- Insert initial hospital data
INSERT INTO "hospital_info" (
    "id", "name", "representative", "businessNumber", "address", 
    "mainPhone", "specialtyPhone", "weekdayOpen", "weekdayClose", 
    "saturdayOpen", "saturdayClose", "lunchStart", "lunchEnd", "closedDays",
    "createdAt", "updatedAt"
) VALUES (
    'hospital-001',
    '소리청 일곡에스한방병원',
    '대표원장 민용태',
    '503-94-5547',
    '광주광역시 북구 일곡동 840-2',
    '062-571-2222',
    '062-369-2075 (이명치료)',
    '09:00',
    '18:00',
    '09:00',
    '12:30',
    '12:30',
    '14:00',
    '일요일, 공휴일, 매월 둘째주 목요일 오후',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
) ON CONFLICT ("id") DO UPDATE SET
    "name" = EXCLUDED."name",
    "mainPhone" = EXCLUDED."mainPhone",
    "specialtyPhone" = EXCLUDED."specialtyPhone",
    "weekdayOpen" = EXCLUDED."weekdayOpen",
    "weekdayClose" = EXCLUDED."weekdayClose",
    "saturdayOpen" = EXCLUDED."saturdayOpen",
    "saturdayClose" = EXCLUDED."saturdayClose",
    "lunchStart" = EXCLUDED."lunchStart",
    "lunchEnd" = EXCLUDED."lunchEnd",
    "closedDays" = EXCLUDED."closedDays",
    "updatedAt" = CURRENT_TIMESTAMP;

-- Create users table (for authentication)
CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "phone" TEXT,
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- Create accounts table (for OAuth)
CREATE TABLE IF NOT EXISTS "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- Create verification_tokens table
CREATE TABLE IF NOT EXISTS "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- Create unique constraints
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "accounts_provider_providerAccountId_key" ON "accounts"("provider", "provider_account_id");
CREATE UNIQUE INDEX IF NOT EXISTS "sessions_sessionToken_key" ON "sessions"("session_token");
CREATE UNIQUE INDEX IF NOT EXISTS "verification_tokens_token_key" ON "verification_tokens"("token");
CREATE UNIQUE INDEX IF NOT EXISTS "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- Add foreign key constraints
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create RLS policies
ALTER TABLE "hospital_info" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "accounts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "sessions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "verification_tokens" ENABLE ROW LEVEL SECURITY;

-- Allow public read access to hospital_info
CREATE POLICY "hospital_info_select_policy" ON "hospital_info" FOR SELECT USING (true);

-- Allow authenticated users to manage their own data
CREATE POLICY "users_select_policy" ON "users" FOR SELECT USING (auth.uid()::text = id);
CREATE POLICY "users_insert_policy" ON "users" FOR INSERT WITH CHECK (auth.uid()::text = id);
CREATE POLICY "users_update_policy" ON "users" FOR UPDATE USING (auth.uid()::text = id);

-- Allow authenticated users to manage their accounts
CREATE POLICY "accounts_select_policy" ON "accounts" FOR SELECT USING (auth.uid()::text = "user_id");
CREATE POLICY "accounts_insert_policy" ON "accounts" FOR INSERT WITH CHECK (auth.uid()::text = "user_id");
CREATE POLICY "accounts_update_policy" ON "accounts" FOR UPDATE USING (auth.uid()::text = "user_id");
CREATE POLICY "accounts_delete_policy" ON "accounts" FOR DELETE USING (auth.uid()::text = "user_id");

-- Allow authenticated users to manage their sessions
CREATE POLICY "sessions_select_policy" ON "sessions" FOR SELECT USING (auth.uid()::text = "user_id");
CREATE POLICY "sessions_insert_policy" ON "sessions" FOR INSERT WITH CHECK (auth.uid()::text = "user_id");
CREATE POLICY "sessions_update_policy" ON "sessions" FOR UPDATE USING (auth.uid()::text = "user_id");
CREATE POLICY "sessions_delete_policy" ON "sessions" FOR DELETE USING (auth.uid()::text = "user_id"); 