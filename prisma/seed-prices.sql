-- 비급여 가격 카테고리 및 항목 데이터 삽입

-- 1. 주요 카테고리들 (level 0 - 최상위)
INSERT INTO price_categories (id, name, "order", is_active, level, parent_id, created_at, updated_at) VALUES
('cat-001', '진료비', 1, true, 0, null, NOW(), NOW()),
('cat-002', '검사비', 2, true, 0, null, NOW(), NOW()),
('cat-003', '치료비', 3, true, 0, null, NOW(), NOW()),
('cat-004', '기타비용', 4, true, 0, null, NOW(), NOW());

-- 2. 진료비 하위 카테고리들 (level 1)
INSERT INTO price_categories (id, name, "order", is_active, level, parent_id, created_at, updated_at) VALUES
('cat-001-001', '초진료비', 1, true, 1, 'cat-001', NOW(), NOW()),
('cat-001-002', '재진료비', 2, true, 1, 'cat-001', NOW(), NOW()),
('cat-001-003', '응급진료비', 3, true, 1, 'cat-001', NOW(), NOW());

-- 3. 검사비 하위 카테고리들 (level 1)
INSERT INTO price_categories (id, name, "order", is_active, level, parent_id, created_at, updated_at) VALUES
('cat-002-001', '청력검사', 1, true, 1, 'cat-002', NOW(), NOW()),
('cat-002-002', '평형기능검사', 2, true, 1, 'cat-002', NOW(), NOW()),
('cat-002-003', '영상검사', 3, true, 1, 'cat-002', NOW(), NOW());

-- 4. 치료비 하위 카테고리들 (level 1)
INSERT INTO price_categories (id, name, "order", is_active, level, parent_id, created_at, updated_at) VALUES
('cat-003-001', '침치료', 1, true, 1, 'cat-003', NOW(), NOW()),
('cat-003-002', '한약치료', 2, true, 1, 'cat-003', NOW(), NOW()),
('cat-003-003', '물리치료', 3, true, 1, 'cat-003', NOW(), NOW());

-- 5. 진료비 항목들
INSERT INTO price_items (id, category_id, name, description, specification, price_type, price_min, price_max, price_text, "order", is_active, created_at, updated_at) VALUES
-- 초진료비 항목들
('item-001', 'cat-001-001', '이비인후과 초진', '이비인후과 초진료비', '30분', 'FIXED', 50000, null, null, 1, true, NOW(), NOW()),
('item-002', 'cat-001-001', '한의과 초진', '한의과 초진료비', '30분', 'FIXED', 45000, null, null, 2, true, NOW(), NOW()),

-- 재진료비 항목들
('item-003', 'cat-001-002', '이비인후과 재진', '이비인후과 재진료비', '20분', 'FIXED', 30000, null, null, 1, true, NOW(), NOW()),
('item-004', 'cat-001-002', '한의과 재진', '한의과 재진료비', '20분', 'FIXED', 25000, null, null, 2, true, NOW(), NOW()),

-- 응급진료비 항목들
('item-005', 'cat-001-003', '응급진료', '응급실 진료비', '응급시', 'FIXED', 80000, null, null, 1, true, NOW(), NOW()),

-- 청력검사 항목들
('item-006', 'cat-002-001', '순음청력검사', '기본 청력검사', '양측', 'FIXED', 25000, null, null, 1, true, NOW(), NOW()),
('item-007', 'cat-002-001', '어음청력검사', '어음 청력검사', '양측', 'FIXED', 30000, null, null, 2, true, NOW(), NOW()),
('item-008', 'cat-002-001', '고막운동성검사', '고막운동성 측정', '양측', 'FIXED', 40000, null, null, 3, true, NOW(), NOW()),

-- 평형기능검사 항목들
('item-009', 'cat-002-002', '온도안진검사', '전정기능 검사', '양측', 'FIXED', 60000, null, null, 1, true, NOW(), NOW()),
('item-010', 'cat-002-002', '회전의자검사', '전정기능 검사', '1회', 'FIXED', 50000, null, null, 2, true, NOW(), NOW()),

-- 영상검사 항목들
('item-011', 'cat-002-003', 'CT 촬영', '컴퓨터단층촬영', '1부위', 'FIXED', 150000, null, null, 1, true, NOW(), NOW()),
('item-012', 'cat-002-003', 'MRI 촬영', '자기공명영상', '1부위', 'FIXED', 200000, null, null, 2, true, NOW(), NOW()),

-- 침치료 항목들
('item-013', 'cat-003-001', '침치료', '침술 치료', '1회', 'FIXED', 20000, null, null, 1, true, NOW(), NOW()),
('item-014', 'cat-003-001', '전침치료', '전기침 치료', '1회', 'FIXED', 25000, null, null, 2, true, NOW(), NOW()),

-- 한약치료 항목들
('item-015', 'cat-003-002', '한약처방', '한약 처방전', '1일분', 'FIXED', 15000, null, null, 1, true, NOW(), NOW()),
('item-016', 'cat-003-002', '한약재료비', '한약재료비', '1일분', 'RANGE', 10000, 20000, null, 2, true, NOW(), NOW()),

-- 물리치료 항목들
('item-017', 'cat-003-003', '물리치료', '물리치료', '1회', 'FIXED', 30000, null, null, 1, true, NOW(), NOW()),
('item-018', 'cat-003-003', '마사지치료', '마사지 치료', '1회', 'FIXED', 25000, null, null, 2, true, NOW(), NOW());

-- 6. 기타비용 항목들
INSERT INTO price_items (id, category_id, name, description, specification, price_type, price_min, price_max, price_text, "order", is_active, created_at, updated_at) VALUES
('item-019', 'cat-004', '주차비', '병원 주차비', '1시간', 'FIXED', 2000, null, null, 1, true, NOW(), NOW()),
('item-020', 'cat-004', '진료서류발급', '진료확인서 발급', '1통', 'FIXED', 5000, null, null, 2, true, NOW(), NOW()),
('item-021', 'cat-004', '의료기기사용료', '의료기기 사용료', '1회', 'TEXT', null, null, '진료내용에 따라 상이', 3, true, NOW(), NOW());

