// 1. DATA DATABASE (TEMPAT ANDA MEMASUKKAN 50 FOTO)
const galleryData = {
    1: {
        title: "Bakor PA Wilayah I",
        distrik: "Binjai • Langkat Hulu • Langkat Hilir",
        photos: [
            "https://picsum.photos/id/10/800/800", // Ganti dengan link foto ke-1
            "https://picsum.photos/id/11/800/800", // Ganti dengan link foto ke-2
            // ... Masukkan link foto lainnya sampai 50 foto
        ]
    },
    2: {
        title: "Bakor PA Wilayah II",
        distrik: "Karo Timur • Karo Utara • Karo Pusat • Karo Selatan • Karo Barat A • Karo Barat B",
        photos: [
            "https://picsum.photos/id/20/800/800",
            "https://picsum.photos/id/21/800/800",
        ]
    },
    3: {
        title: "Bakor PA Wilayah III",
        distrik: "Siantar Kota • Siantar • SLA-UASN • Tanjung Kasau • Perdagangan • Huta Bayu Raja • Tanah Jawa • Simalungun (Selatan, Barat, Utara)",
        photos: []
    },
    4: {
        title: "Bakor PA Wilayah IV",
        distrik: "Dairi (Selatan, Pusat, Timur, Barat) • Parongil • Pakpak Barat",
        photos: []
    },
    5: {
        title: "Bakor PA Wilayah V",
        distrik: "Samosir Timur • Samosir Barat • Samosir Selatan",
        photos: []
    },
    6: {
        title: "Bakor PA Wilayah VI",
        distrik: "Toba Timur • Toba Barat • Toba Pusat • Habinsaran",
        photos: []
    }
};

// SIMULASI: Baris kode di bawah ini HANYA pengisi otomatis agar Anda melihat hasilnya.
// Anda bisa menghapus fungsi ini setelah mengisi link asli di atas.
function generatePlaceholderIfEmpty() {
    for (let w = 1; w <= 6; w++) {
        if (galleryData[w].photos.length < 50) {
            for (let i = galleryData[w].photos.length; i < 50; i++) {
                galleryData[w].photos.push(`https://picsum.photos/800/800?random=${w}${i}`);
            }
        }
    }
}
generatePlaceholderIfEmpty();


// 2. CORE LOGIC (Jangan ubah bagian ini agar tetap konsisten)
const photoGrid = document.getElementById('photo-grid');
const wilayahName = document.getElementById('wilayah-name');
const wilayahDistrik = document.getElementById('wilayah-distrik');

function changeWilayah(wId) {
    // Update Button Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${wId}`).classList.add('active');

    // Update Text
    wilayahName.innerText = galleryData[wId].title;
    wilayahDistrik.innerText = galleryData[wId].distrik;

    // Clear Grid with transition
    photoGrid.style.opacity = '0';
    
    setTimeout(() => {
        photoGrid.innerHTML = '';
        
        galleryData[wId].photos.forEach((src, index) => {
            const item = document.createElement('div');
            item.className = "gallery-item";
            item.innerHTML = `
                <div class="img-container glass group cursor-pointer" onclick="openLightbox('${src}', '${galleryData[wId].title}')">
                    <img src="${src}" alt="Photo" loading="lazy">
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                        <div class="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                    </div>
                </div>
            `;
            photoGrid.appendChild(item);

            // Staggered Animation
            setTimeout(() => item.classList.add('show'), index * 30);
        });
        
        photoGrid.style.opacity = '1';
    }, 300);
}

// 3. LIGHTBOX LOGIC
function openLightbox(src, caption) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lb-img');
    const cap = document.getElementById('lb-cap');

    img.src = src;
    cap.innerText = caption;
    lb.classList.remove('hidden');
    lb.classList.add('flex');
    setTimeout(() => img.classList.remove('scale-95'), 10);
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    lb.classList.add('hidden');
    lb.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

// Initial Call
window.onload = () => changeWilayah(1);