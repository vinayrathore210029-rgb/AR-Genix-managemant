const axios = require('axios');

async function testAuth() {
    console.log('--- TESTING EMPLOYEE LOGIN API ---');
    const url = 'http://localhost:5000/api/auth/login';

    // Test 1: Wrong Password
    try {
        console.log('\\n[1] Testing Invalid Password...');
        await axios.post(url, {
            email: 'vinay.argenixaisolutions@gmail.com',
            password: 'WRONGPASSWORD123',
            role: 'EMPLOYEE'
        });
        console.log('❌ FAIL: Request succeeded but it should have failed.');
    } catch (e) {
        if (e.response && e.response.status === 401) {
            console.log('✅ PASS: Correctly rejected invalid login with 401 Invalid Credentials.');
        } else {
            console.log('❌ FAIL: Received unexpected error:', e.message);
        }
    }

    // Test 2: Valid Login
    try {
        console.log('\\n[2] Testing Valid Credentials...');
        const res = await axios.post(url, {
            email: 'vinay.argenixaisolutions@gmail.com',
            password: 'Vinay@123',
            role: 'EMPLOYEE'
        });

        if (res.data.token && res.data.user.email === 'vinay.argenixaisolutions@gmail.com') {
            console.log('✅ PASS: Successfully authenticated and generated JWT Token.');
            console.log('   -> Role:', res.data.user.role);
            console.log('   -> User ID:', res.data.user.id);
            console.log('   -> Destination:', '/employee/dashboard (handled by frontend callback)');
        } else {
            console.log('❌ FAIL: Response did not contain token or user match.');
        }
    } catch (e) {
        console.log('❌ FAIL: Login request failed with valid credentials:', e.response?.data || e.message);
    }
}

testAuth();
