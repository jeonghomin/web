-- Create hospital_info table (Supabase 형식)
CREATE TABLE IF NOT EXISTS hospital_info (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    representative TEXT NOT NULL,
    business_number TEXT NOT NULL,
    address TEXT NOT NULL,
    address_detail TEXT,
    parking_info TEXT,
    main_phone TEXT NOT NULL,
    specialty_phone TEXT,
    weekday_open TEXT NOT NULL,
    weekday_close TEXT NOT NULL,
    saturday_open TEXT,
    saturday_close TEXT,
    lunch_start TEXT NOT NULL,
    lunch_end TEXT NOT NULL,
    closed_days TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial hospital data
INSERT INTO hospital_info (
    id, name, representative, business_number, address, 
    main_phone, specialty_phone, weekday_open, weekday_close, 
    saturday_open, saturday_close, lunch_start, lunch_end, closed_days
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
    '일요일, 공휴일'
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    main_phone = EXCLUDED.main_phone,
    specialty_phone = EXCLUDED.specialty_phone,
    weekday_open = EXCLUDED.weekday_open,
    weekday_close = EXCLUDED.weekday_close,
    saturday_open = EXCLUDED.saturday_open,
    saturday_close = EXCLUDED.saturday_close,
    lunch_start = EXCLUDED.lunch_start,
    lunch_end = EXCLUDED.lunch_end,
    closed_days = EXCLUDED.closed_days,
    updated_at = NOW();

-- Enable RLS
ALTER TABLE hospital_info ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON hospital_info
    FOR SELECT
    USING (true);

