   // === DATOS DE PROYECTOS ===
        const projects = [
            {
                id: 1,
                title: "Vivienda Bioclimática Azumiatla",
                author: "Arq. Mauricio Ruiz Morales",
                category: "Vivienda sustentable",
                description: "Prototipo de vivienda integral en zona rural de Puebla. Presentado en Smart City 2016. Estrategias de captación pluvial, muros de adobe y ventilación cruzada.",
                rating: 4.8,
                votes: 12,
                icon: "🏠"
            },
            {
                id: 2,
                title: "Módulo Piloto BTC - Eficiencia Energética",
                author: "Equipo IARCS",
                category: "Materiales y técnicas",
                description: "Módulo experimental con bloques de tierra comprimida (BTC). Primer lugar nacional en arquitectura sostenible - Eficiencia Energética (Tec de Monterrey / Dow Chemical).",
                rating: 4.5,
                votes: 8,
                icon: "🧱"
            },
            {
                id: 3,
                title: "Equipamiento Educativo Lancaster",
                author: "IDeHaS · SCAP",
                category: "Equipamiento educativo",
                description: "Diseño de escuela con estrategias pasivas de climatización, iluminación natural y materiales locales. Proyecto construido y en operación.",
                rating: 4.2,
                votes: 6,
                icon: "🏫"
            },
            {
                id: 4,
                title: "Plan Maestro Participativo INFONAVIT",
                author: "Mauricio Ruiz Morales + Equipo",
                category: "Diseño urbano",
                description: "Diagnóstico integral y planes maestros participativos para la regeneración de conjuntos habitacionales en Tecámac y Tlajomulco.",
                rating: 4.0,
                votes: 5,
                icon: "🏙️"
            },
            {
                id: 5,
                title: "Índice de Desarrollo del Hábitat (IDeHa)",
                author: "Mauricio Ruiz Morales & Alejandro Acosta",
                category: "Investigación",
                description: "Metodología multidimensional para medir el desarrollo del hábitat en Aguascalientes. Variables poblacionales, de vivienda y conectividad.",
                rating: 4.7,
                votes: 9,
                icon: "📊"
            },
            {
                id: 6,
                title: "Vivienda Piloto FOVISSSTE",
                author: "Arq. Mauricio Ruiz Morales",
                category: "Vivienda sustentable",
                description: "Primer lugar nacional en Concurso de Vivienda Piloto FOVISSSTE. Diseño bioclimático para clima templado-subhúmedo con bajo costo de construcción.",
                rating: 4.9,
                votes: 15,
                icon: "🌿"
            }
        ];

        // === RENDERIZAR PROYECTOS ===
        function renderProjects() {
            const grid = document.getElementById('projectsGrid');
            grid.innerHTML = projects.map(p => `
                <div class="project-card fade-in">
                    <div class="project-image">${p.icon}</div>
                    <div class="project-body">
                        <span class="project-category">${p.category}</span>
                        <h3>${p.title}</h3>
                        <p>${p.description}</p>
                        <div class="project-meta">
                            <span>${p.author}</span>
                            <span>
                                <span class="stars">${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5 - Math.round(p.rating))}</span>
                                ${p.rating.toFixed(1)} (${p.votes})
                            </span>
                        </div>
                    </div>
                </div>
            `).join('');
            observeFadeIns();
        }

        // === SUBIR ARCHIVO ===
        function updateFileName(input) {
            const fileName = document.getElementById('fileName');
            if (input.files && input.files[0]) {
                fileName.textContent = '✅ Archivo seleccionado: ' + input.files[0].name;
            } else {
                fileName.textContent = '';
            }
        }

        // === FORMULARIO SUBIR ===
        document.getElementById('uploadForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const titulo = document.getElementById('titulo').value.trim();
            const autor = document.getElementById('autor').value.trim();
            const categoria = document.getElementById('categoria').value;
            const descripcion = document.getElementById('descripcion').value.trim();

            if (!titulo || !autor || !categoria || !descripcion) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }

            // Simular publicación
            alert(`✅ ¡Proyecto "${titulo}" publicado con éxito!\n\nAutor: ${autor}\nCategoría: ${categoria}\n\nEl trabajo estará visible para la comunidad.`);

            // Añadir a la lista de proyectos
            const newProject = {
                id: projects.length + 1,
                title: titulo,
                author: autor,
                category: categoria,
                description: descripcion,
                rating: 0,
                votes: 0,
                icon: '📄'
            };
            projects.unshift(newProject);
            renderProjects();

            // Resetear formulario
            this.reset();
            document.getElementById('fileName').textContent = '';

            // Scroll a proyectos
            document.getElementById('proyectos').scrollIntoView({ behavior: 'smooth' });
        });

        // === PUNTUACIÓN ===
        let currentRating = 0;
        let totalVotes = 0;
        let sumRatings = 0;

        const stars = document.querySelectorAll('#ratingStars span');
        const ratingValue = document.getElementById('ratingValue');

        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = parseInt(this.dataset.value);
                currentRating = value;
                totalVotes++;
                sumRatings += value;

                // Actualizar estrellas visuales
                stars.forEach((s, i) => {
                    s.classList.toggle('active', i < value);
                });

                // Actualizar promedio
                const avg = (sumRatings / totalVotes).toFixed(1);
                ratingValue.textContent = avg;

                // Actualizar contador de votos
                this.parentElement.parentElement.querySelector('span:last-child').textContent = `(${totalVotes} votos)`;

                // Animación de confirmación
                this.style.transform = 'scale(1.3)';
                setTimeout(() => { this.style.transform = 'scale(1)'; }, 200);
            });

            // Hover effect
            star.addEventListener('mouseenter', function() {
                const value = parseInt(this.dataset.value);
                stars.forEach((s, i) => {
                    s.style.color = i < value ? '#f0b429' : '#ddd';
                });
            });

            star.addEventListener('mouseleave', function() {
                stars.forEach((s, i) => {
                    s.style.color = i < currentRating ? '#f0b429' : '#ddd';
                });
            });
        });

        // === COMENTARIOS ===
        document.getElementById('commentForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('commentName').value.trim();
            const text = document.getElementById('commentText').value.trim();

            if (!name || !text) return;

            const commentList = document.getElementById('commentList');
            const comment = document.createElement('div');
            comment.className = 'comment-item';
            comment.innerHTML = `
                <div class="comment-header">
                    <span class="comment-author">${escapeHtml(name)}</span>
                    <span class="comment-date">Justo ahora</span>
                </div>
                <p class="comment-text">${escapeHtml(text)}</p>
            `;

            commentList.prepend(comment);
            this.reset();
        });

        // === UTILIDADES ===
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // === ANIMACIONES FADE-IN ===
        function observeFadeIns() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        }

        // === INICIALIZACIÓN ===
        document.addEventListener('DOMContentLoaded', () => {
            renderProjects();
            observeFadeIns();
        });