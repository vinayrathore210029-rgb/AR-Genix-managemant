const axios = require('axios');

async function testSuperAdminAuth() {
    console.log('--- TESTING SUPER ADMIN LOGIN API ---');
    const url = 'http://localhost:5000/api/auth/login';
    const email = 'amitcarpenter198@mailinator.com';
    const password = 'Super@123';

    try {
        console.log(`\nTesting Valid Credentials for ${email}...`);
        const res = await axios.post(url, {
            email: email,
            password: password,
            role: 'SUPER_ADMIN'
        });

        if (res.data.token && res.data.user.role === 'SUPER_ADMIN') {
            console.log('✅ PASS: Successfully authenticated Super Admin and generated JWT Token.');
            console.log('   -> Role:', res.data.user.role);
            console.log('   -> User ID:', res.data.user.id);
        } else {
            console.log('❌ FAIL: Response did not contain expected token or correct role.');
            console.log('   -> Received:', res.data);
        }
    } catch (e) {
        console.log('❌ FAIL: Login request failed:', e.response?.data || e.message);
    }
}

testSuperAdminAuth();
