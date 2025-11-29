const supabase = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middlewares/asyncHandler');

/**
 * ลงทะเบียนผู้ใช้ใหม่ (Register)
 * รับค่า username และ password จาก body
 */
const register = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // 1. ตรวจสอบว่าใส่ข้อมูลครบหรือไม่
    if (!username || !password) {
        res.status(400);
        throw new Error('กรุณาระบุ Username และ Password');
    }

    // 2. ตรวจสอบว่ามี Username นี้ในระบบแล้วหรือยัง
    const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();

    if (existingUser) {
        res.status(400);
        throw new Error('Username นี้ถูกใช้งานแล้ว');
    }

    // 3. เข้ารหัส Password (Hashing) เพื่อความปลอดภัย
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. บันทึกข้อมูลลงฐานข้อมูล
    const { data, error } = await supabase
        .from('users')
        .insert([{ username, password: hashedPassword }])
        .select()
        .single();

    if (error) throw error;

    // 5. ส่งค่ากลับเมื่อสำเร็จ
    res.status(201).json({
        message: 'ลงทะเบียนสำเร็จ',
        user: { id: data.id, username: data.username }
    });
});

/**
 * เข้าสู่ระบบ (Login)
 * ตรวจสอบ username/password และสร้าง Token
 */
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // 1. ตรวจสอบข้อมูลนำเข้า
    if (!username || !password) {
        res.status(400);
        throw new Error('กรุณาระบุ Username และ Password');
    }

    // 2. ค้นหาผู้ใช้ในระบบ
    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();

    if (error || !user) {
        res.status(401);
        throw new Error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }

    // 3. ตรวจสอบรหัสผ่าน
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        res.status(401);
        throw new Error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }

    // 4. สร้าง Token (JWT) สำหรับยืนยันตัวตน
    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'your-secret-key', // ควรใช้ Environment Variable ใน Production
        { expiresIn: '24h' } // Token หมดอายุใน 24 ชั่วโมง
    );

    // 5. ส่ง Token และข้อมูลผู้ใช้กลับไป
    res.json({
        message: 'เข้าสู่ระบบสำเร็จ',
        token,
        user: { id: user.id, username: user.username }
    });
});

module.exports = { register, login };
