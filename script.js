// ข้อมูลโปรแกรม
const programs = [
    {
        id: 1,
        name: "Internet Download Manager (IDM)",
        description: "โปรแกรมช่วยดาวน์โหลดไฟล์ที่มีประสิทธิภาพสูง เพิ่มความเร็วในการดาวน์โหลดได้มากถึง 5 เท่า สามารถจัดการการดาวน์โหลดได้อย่างมีประสิทธิภาพ รองรับการดาวน์โหลดแบบต่อเนื่องและการดาวน์โหลดตามกำหนดเวลา",
        image: "https://img.utdstc.com/icon/2b6/7d8/2b67d8d47efc520e4f344d41cf59eb0344846f0c93fd5cf2b7d0d4914e22dd2d:200",
        downloadLink: "https://gofile.io/d/cLE5NL",
        password: null
    },
    {
        id: 2,
        name:"Microsoft Office 365",
        description: "Microsoft Office 365 คือบริการการสมัครใช้งานรายปีที่รับรองว่าคุณจะได้รับแอปฯและบริการต่างๆ อันมีประสิทธิภาพและทันสมัยที่สุดจาก Microsoft อยู่เสมอ คุณจะได้รับพื้นที่จัดเก็บแบบออนไลน์เพิ่มเติมและได้รับฟีเจอร์เพิ่มเติมอื่นๆที่ไม่มีในรุ่นปกติทั้งใน Desktop และ Mobile Device",
        image: "https://i0.wp.com/mawtoload.com/wp-content/uploads/2023/09/Office-365-icon.png?resize=256%2C256&ssl=1",
        downloadLink: "https://gofile.io/d/ZMKizX",
        password: "mawto"
    }
    // เพิ่มโปรแกรมอื่นๆ ต่อไปได้ที่นี่
];

// ฟังก์ชันสำหรับสร้าง HTML ของการ์ดโปรแกรม
function createProgramCard(program) {
    return `
        <div class="card bg-base-100 shadow-xl">
            <figure><img src="${program.image}" alt="${program.name}" loading="lazy" /></figure>
            <div class="card-body">
                <h2 class="card-title">${program.name}</h2>
                <p>${program.description.substring(0, 100)}...</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary" onclick="showProgramDetails(${program.id})">ดูรายละเอียด</button>
                </div>
            </div>
        </div>
    `;
}

// ฟังก์ชันสำหรับแสดงรายละเอียดโปรแกรม
function showProgramDetails(id) {
    const program = programs.find(p => p.id === id);
    if (!program) return;

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white p-8 rounded-lg max-w-2xl w-full">
            <h2 class="text-2xl font-bold mb-4">${program.name}</h2>
            <img src="${program.image}" alt="${program.name}" class="mb-4 rounded" />
            <p class="mb-4">${program.description}</p>
            <a href="${program.downloadLink}" class="btn btn-primary mb-2" target="_blank">ดาวน์โหลด</a>
            ${program.password ? `<p class="text-sm">รหัสผ่าน: ${program.password}</p>` : ''}
            <button class="btn btn-ghost mt-4" onclick="this.closest('.fixed').remove()">ปิด</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// ฟังก์ชันสำหรับค้นหาโปรแกรม
function searchPrograms(query) {
    query = query.toLowerCase().trim();
    return programs.filter(program => 
        program.name.toLowerCase().includes(query) || 
        program.description.toLowerCase().includes(query)
    );
}

// ฟังก์ชันสำหรับอัปเดตรายการโปรแกรม
function updateProgramList(filteredPrograms) {
    const programContainer = document.getElementById('program-container');
    if (filteredPrograms.length === 0) {
        programContainer.innerHTML = '<p class="text-center text-gray-500">ไม่พบโปรแกรมที่ตรงกับคำค้นหา</p>';
    } else {
        programContainer.innerHTML = filteredPrograms.map(createProgramCard).join('');
    }
}

// แสดงโปรแกรมทั้งหมดเมื่อโหลดหาเว็บ
function initializeProgramList() {
    const programContainer = document.getElementById('program-container');
    programContainer.innerHTML = programs.map(createProgramCard).join('');
}

// ฟังก์ชันสำหรับโหลดข้อมูล Discord profile
async function loadDiscordProfile() {
    const userId = '262147369750102016';
    const discordProfileElement = document.getElementById('discord-profile');
    
    if (!discordProfileElement) return;

    // ใช้ innerHTML เพียงครั้งเดียว
    discordProfileElement.textContent = 'กำลังโหลดข้อมูล Discord...';

    try {
        const response = await fetch(`https://discordlookup.mesalytic.moe/v1/user/${userId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        // สร้าง DOM elements แทนการใช้ innerHTML
        const container = document.createElement('div');
        container.className = 'flex items-center bg-gray-100 p-4 rounded-lg mb-4';

        const img = document.createElement('img');
        img.src = data.avatar.link;
        img.alt = data.username;
        img.className = 'w-16 h-16 rounded-full mr-4';
        img.loading = 'lazy'; // เพิ่ม lazy loading

        const infoDiv = document.createElement('div');
        
        const namePara = document.createElement('p');
        namePara.className = 'font-semibold';
        namePara.textContent = data.global_name || data.username;

        const discriminatorPara = document.createElement('p');
        discriminatorPara.className = 'text-sm text-gray-500';
        discriminatorPara.textContent = data.discriminator !== '0' ? `#${data.discriminator}` : '';

        infoDiv.appendChild(namePara);
        infoDiv.appendChild(discriminatorPara);
        container.appendChild(img);
        container.appendChild(infoDiv);

        const addFriendButton = document.createElement('button');
        addFriendButton.id = 'add-friend';
        addFriendButton.className = 'btn btn-primary w-full mt-4';
        addFriendButton.textContent = 'เพิ่มเพื่อน Discord';

        // ใช้ event delegation
        addFriendButton.addEventListener('click', () => {
            window.open(`https://discord.com/users/${data.id}`, '_blank');
        });

        // Clear existing content and append new elements
        discordProfileElement.innerHTML = '';
        discordProfileElement.appendChild(container);
        discordProfileElement.appendChild(addFriendButton);

    } catch (error) {
        console.error('Error fetching Discord profile:', error);
        discordProfileElement.textContent = 'ไม่สามารถโหลดข้อมูล Discord profile ได้';
        discordProfileElement.className = 'text-red-500';
    }
}

// เรียกใช้ฟังก์ชันเมื่อ DOM โหลดเสร็จ และเฉพาะในหน้า contact.html
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}

function initializePage() {
    if (window.location.pathname.includes('contact.html')) {
        loadDiscordProfile();
    } else if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        initializeSearchFunctionality();
        initializeProgramList();
    }
}

function initializeSearchFunctionality() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    if (!searchInput || !searchButton) return;

    let debounceTimer;

    const performSearch = () => {
        const query = searchInput.value;
        const filteredPrograms = searchPrograms(query);
        updateProgramList(filteredPrograms);
    };

    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(performSearch, 300);
    });

    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
}
