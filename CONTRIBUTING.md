# วิธีทำงานร่วมกันบน ModMatch FE

เขียนให้คนในทีมที่เพิ่งเข้ามาช่วยเขียนโค้ด อ่านจบแล้วควร push งานแรกได้เลย

## เริ่มต้นบนเครื่องตัวเอง

```bash
git clone https://github.com/Kittithat17/Modmatch-FE.git
cd Modmatch-FE
nvm use          # ใช้ Node ตาม .nvmrc คือเวอร์ชัน 20
npm ci           # ใช้ ci ไม่ใช่ install จะได้เวอร์ชันตรงกับ package-lock ทุกคน
cp .env.example .env.local
npm run dev
```

## branch ใช้ยังไง

มี branch ถาวรสองอัน ห้าม push ตรงเข้าสองอันนี้ ต้องผ่าน PR เท่านั้น

| branch | คืออะไร | ใครเอาเข้า |
| --- | --- | --- |
| `main` | โค้ดที่ขึ้น production ต้องใช้งานได้เสมอ | merge จาก `dev` เท่านั้น |
| `dev` | ที่รวมงานของทุกคน เป็นค่าเริ่มต้นที่แตก branch ออกไป | merge จาก feature branch |

เวลาจะทำงานใหม่ แตก branch จาก `dev` เสมอ

```bash
git checkout dev
git pull
git checkout -b feat/matching-filter
```

ตั้งชื่อ branch ตามนี้ `feat/` ของใหม่ `fix/` แก้บั๊ก `chore/` งานจิปาถะเช่นอัปเดต dependency `refactor/` ย้ายโค้ดโดยพฤติกรรมเหมือนเดิม

## เส้นทางของโค้ดหนึ่งชิ้น

```
feat/xxx  ──PR──▶  dev  ──PR──▶  main
   ▲                ▲              ▲
   │                │              │
CI รันทุก push   CI รันซ้ำ      CI รันซ้ำ
```

1. เขียนโค้ดบน feature branch แล้ว push CI จะรันให้ทันทีทุกครั้งที่ push
2. เปิด PR เข้า `dev` รอ CI เขียว แล้วรออย่างน้อยหนึ่งคนอนุมัติ
3. merge เข้า `dev` แล้วลอง `dev` ให้แน่ใจว่าไม่พัง
4. พอพร้อมปล่อยจริง เปิด PR จาก `dev` เข้า `main`

## ก่อน push ทุกครั้ง

รันสามคำสั่งนี้ให้ผ่านก่อน จะได้ไม่เสียเวลารอ CI แดงแล้วมาแก้

```bash
npm run lint
npm run typecheck
npm run build
```

`npm run lint:fix` ช่วยแก้ที่แก้อัตโนมัติได้ให้

## โค้ดไปวางตรงไหน

| จะเพิ่มอะไร | วางที่ |
| --- | --- |
| หน้าใหม่ | `src/app/<route>/page.tsx` ให้ไฟล์นี้บางที่สุด ตรรกะจริงไปอยู่ใน feature |
| ตรรกะของ domain หนึ่ง เช่น การจับคู่ | `src/features/<feature>/` อ่านกติกาใน `src/features/README.md` |
| ปุ่ม input card ที่ใช้ซ้ำได้ทุกที่ | `src/components/ui/` ห้ามมี business logic |
| navbar footer sidebar | `src/components/layout/` |
| ฟังก์ชันเรียก backend | ผ่าน `src/lib/api-client.ts` เท่านั้น อย่า fetch ตรงในคอมโพเนนต์ |
| hook ที่หลาย feature ใช้ | `src/hooks/` ถ้าใช้ feature เดียวเก็บไว้ใน feature นั้น |
| type ที่หลาย feature ใช้ | `src/types/` |

import ใช้ alias `@/` ได้เลย เช่น `import { apiFetch } from "@/lib/api-client"` ชี้ไปที่ `src/`

## เรื่อง env

ตัวแปรที่ขึ้นต้นด้วย `NEXT_PUBLIC_` จะถูกฝังลงใน bundle ฝั่ง browser ใครเปิด devtools ก็เห็น
ห้ามใส่ API key หรืออะไรที่เป็นความลับในตัวแปรกลุ่มนี้
เพิ่ม env ตัวใหม่เมื่อไหร่ ให้เติมชื่อมันใน `.env.example` ด้วยทุกครั้ง คนอื่นจะได้รู้ว่าต้องตั้งค่าอะไรบ้าง
