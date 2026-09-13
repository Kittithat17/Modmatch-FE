# ตั้ง branch protection (เจ้าของ repo ทำครั้งเดียว)

ไฟล์ workflow บังคับให้ CI รันได้ แต่บังคับให้ "ต้องผ่าน CI ก่อน merge" ไม่ได้
ส่วนนั้นเป็น setting บน GitHub ต้องไปกดเอง ทำตามนี้

## ก่อนอื่น push branch ขึ้นไปก่อน

GitHub จะตั้ง rule ให้ branch ที่ยังไม่มีอยู่จริงไม่ได้

```bash
git push origin main
git push -u origin dev
```

แล้วไปที่ Settings ▸ Branches ▸ Add branch ruleset

## ruleset สำหรับ `main`

Target branches ใส่ `main`
Enforcement status เลือก Active

ติ๊กตามนี้

- Restrict deletions
- Block force pushes
- Require a pull request before merging
  - Required approvals: 1
  - Dismiss stale pull request approvals when new commits are pushed
- Require status checks to pass
  - Require branches to be up to date before merging
  - ค้นหาแล้วเลือก check ชื่อ **CI OK**

เลือกแค่ `CI OK` พอ ไม่ต้องเลือก Lint Typecheck Build ทีละอัน
เพราะ job `ci-ok` ใน `ci.yml` รอผลของทั้งสามอันแล้วสรุปให้
เวลาเพิ่ม job ใหม่ในอนาคต แค่เติมชื่อใน `needs` ของ `ci-ok` ไม่ต้องกลับมาแก้ setting ตรงนี้

> ถ้าหา `CI OK` ไม่เจอในช่องค้นหา แปลว่า workflow ยังไม่เคยรันสักครั้ง
> ให้ push อะไรสักอย่างขึ้นไปก่อน แล้วค่อยกลับมาตั้ง

## ruleset สำหรับ `dev`

ทำเหมือน `main` ได้เลย แต่ถ้าทีมยังเล็กและอยากให้คล่องกว่า ลดเหลือแค่นี้ก็พอ

- Block force pushes
- Require a pull request before merging (Required approvals: 0 หรือ 1 แล้วแต่ทีม)
- Require status checks to pass ▸ **CI OK**

## ตั้ง default branch เป็น `dev`

Settings ▸ General ▸ Default branch ▸ เปลี่ยนเป็น `dev`

ทำแบบนี้เวลาเพื่อนกด clone หรือกดเปิด PR บนเว็บ ปลายทางจะเป็น `dev` โดยอัตโนมัติ
ลดโอกาสเปิด PR ยิงเข้า `main` โดยไม่ตั้งใจ
