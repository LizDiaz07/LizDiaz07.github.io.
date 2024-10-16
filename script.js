let currentPage = 1;
const userList = document.getElementById('user-list');
const pageNumber = document.getElementById('page-number');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

document.addEventListener('DOMContentLoaded', () => {
    fetchUsers(currentPage);
});

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchUsers(currentPage);
    }
});

nextButton.addEventListener('click', () => {
    if (currentPage < 2) {
        currentPage++;
        fetchUsers(currentPage);
    }
});

function fetchUsers(page) {
    userList.innerHTML = '<div class="spinner"></div>'; // Mostrar el spinner

    fetch(`https://reqres.in/api/users?delay=3&page=${page}`)
        .then(response => response.json())
        .then(data => {
            userList.innerHTML = ''; // Limpiar el spinner

            data.data.forEach(user => {
                const userCard = document.createElement('div');
                userCard.classList.add('user-card');
                userCard.innerHTML = `
                    <img src="${user.avatar}" alt="${user.first_name}" width="100">
                    <p>${user.first_name} ${user.last_name}</p>
                    <p>${user.email}</p>
                `;
                userList.appendChild(userCard);
            });

            pageNumber.textContent = page;
            prevButton.disabled = (page === 1);
            nextButton.disabled = (page === 2);
        })
        .catch(error => {
            userList.innerHTML = '<p>Error al cargar los usuarios.</p>';
            console.error('Error:', error);
        });
}
