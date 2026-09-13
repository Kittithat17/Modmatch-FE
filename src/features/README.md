# features

โฟลเดอร์นี้แบ่งโค้ดตาม domain ของธุรกิจ ไม่ใช่ตามชนิดไฟล์
เป้าหมายคือแต่ละ feature จบในตัวเอง เวลาหลายคนทำงานพร้อมกันจะแก้ไฟล์ชนกันน้อยลง

## โครงของหนึ่ง feature

```
src/features/matching/
├── components/      คอมโพเนนต์ที่ใช้เฉพาะ feature นี้
├── hooks/           React hooks ของ feature นี้
├── api.ts           ฟังก์ชันเรียก backend ของ feature นี้ (เรียกผ่าน src/lib/api-client)
└── types.ts         type ของ feature นี้
```

## กติกา

- feature ห้าม import จาก feature อื่นโดยตรง ถ้าต้องใช้ร่วมกันให้ย้ายขึ้นไป `src/components` `src/lib` หรือ `src/types`
- `src/app` ทำหน้าที่แค่ routing ประกอบหน้า และดึงข้อมูลระดับ page ตรรกะจริงอยู่ใน feature
- `src/components/ui` เก็บคอมโพเนนต์ที่ไม่มี business logic เช่น Button Input Card ใช้ซ้ำได้ทุกที่
