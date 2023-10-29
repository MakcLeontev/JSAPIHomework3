const image = document.querySelector('.image');
const nameP = document.querySelector('.name');
const like = document.querySelector('.like');
const likeCount = document.querySelector('.likeCount');

const fetchFoto = async () => {
    const url = `https://api.unsplash.com/photos/random?client_id=qF7JYTmy4AOwiIEnxLZAw9L3Jf1ItAVZ80idfjVkMG8`;
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        image.src = data.urls.full;
        nameP.textContent = 'Автор фото: ' + data.user.first_name
        localStorage.setItem(todayDate, image.src)
    } else {
        console.log('Ошибка загрузки');
    }
}


const likesDownload = () => {
    likeCount.textContent = localStorage.getItem('likes');
}

like.addEventListener('click', () => {
    let count = likeCount.textContent;
    likeCount.textContent = ++count;
    localStorage.setItem('likes', likeCount.textContent);
});

const perFoto = (dateNow) => {
    if (!localStorage.getItem(dateNow)) {
        fetchFoto();
    } else {
        image.src = localStorage.getItem(dateNow);
        likesDownload();
    }
}

const todayDate = new Date().toISOString().slice(0, 10) + '.myApp';
perFoto(todayDate);



