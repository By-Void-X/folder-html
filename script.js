const owner = 'Zeen1146';
const repo = 'BYVOID';
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/`;

async function fetchProjects() {
    const container = document.getElementById('project-list');
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Gagal mengambil data');
        const files = await response.json();
        
        // Filter hanya file (bukan folder)
        const projectFiles = files.filter(file => file.type === 'file');
        
        if (projectFiles.length === 0) {
            container.innerHTML = '<p>Belum ada project di root repository.</p>';
            return;
        }
        
        // Generate card untuk setiap file
        let html = '';
        projectFiles.forEach(file => {
            const fileName = file.name;
            const fileUrl = file.download_url;
            // Tentukan bahasa berdasarkan ekstensi
            const ext = fileName.split('.').pop().toLowerCase();
            let langBadge = '';
            switch(ext) {
                case 'html': langBadge = '🌐 HTML'; break;
                case 'js': langBadge = '⚡ JavaScript'; break;
                case 'py': langBadge = '🐍 Python'; break;
                case 'java': langBadge = '☕ Java'; break;
                case 'cpp': case 'cxx': langBadge = '⚙️ C++'; break;
                case 'c': langBadge = '🔧 C'; break;
                case 'cs': langBadge = '🎯 C#'; break;
                case 'go': langBadge = '🐹 Go'; break;
                case 'rs': langBadge = '🦀 Rust'; break;
                case 'swift': langBadge = '🍎 Swift'; break;
                case 'kt': langBadge = '📱 Kotlin'; break;
                case 'dart': langBadge = '🎨 Dart'; break;
                case 'php': langBadge = '🐘 PHP'; break;
                case 'sql': langBadge = '🗄️ SQL'; break;
                case 'r': langBadge = '📊 R'; break;
                default: langBadge = '📄 ' + ext.toUpperCase();
            }
            html += `
                <div class="project-card">
                    <h3>${fileName}</h3>
                    <p>${langBadge}</p>
                    <a href="${fileUrl}" target="_blank">🔍 Lihat Raw</a>
                    ${ext === 'html' ? `<a href="${fileUrl}" target="_blank">🚀 Buka Langsung</a>` : ''}
                </div>
            `;
        });
        container.innerHTML = html;
    } catch (error) {
        container.innerHTML = `<p style="color:red">Error: ${error.message}. Pastikan repo public atau tambahkan token.</p>`;
    }
}

fetchProjects();