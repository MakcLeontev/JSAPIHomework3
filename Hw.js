const image = document.querySelector('.image');
const nameP = document.querySelector('.name');
const like = document.querySelector('.like');
const likeCount = document.querySelector('.likeCount');
const dateSort = document.querySelector('.dateSort');

const fetchFoto = async () => {
    const url = `https://api.unsplash.com/photos/random?client_id=qF7JYTmy4AOwiIEnxLZAw9L3Jf1ItAVZ80idfjVkMG8`;
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        image.src = data.urls.full;
        nameP.textContent = data.user.first_name
        localStorage.setItem('authorPhoto', nameP.textContent)
        let array = [];
        if (localStorage.getItem('photoArray')) {
            array = JSON.parse(localStorage.getItem('photoArray'));
        }
        const item = {
            date: todayDate,
            author: data.user.first_name,
            link: data.urls.full,
            likes: 0
        }
        array.push(item);
        localStorage.setItem('photoArray', JSON.stringify(array));
        localStorage.setItem(todayDate, image.src)
    } else {
        console.log('Ошибка загрузки');
    }
}


const likesDownload = (date) => {
    // likeCount.textContent = localStorage.getItem('likes');
    if (localStorage.getItem('photoArray')) {
        let array = [];
        array = JSON.parse(localStorage.getItem('photoArray'));
        array.forEach(element => {
            if (date === element.date) {
                likeCount.textContent = element.likes;
                localStorage.setItem('photoArray', JSON.stringify(array));
            }
        });
    }
}

like.addEventListener('click', () => {
    let count = likeCount.textContent;
    likeCount.textContent = ++count;
    const array = JSON.parse(localStorage.getItem('photoArray'));
    array.forEach(element => {
        if (nameP.textContent === element.author) {
            element.likes = likeCount.textContent;
        }
    });
    localStorage.setItem('photoArray', JSON.stringify(array));
});

const perFoto = (dateNow) => {
    if (!localStorage.getItem('photoArray')) {
        fetchFoto();
    } else {
        const array = JSON.parse(localStorage.getItem('photoArray'));
        let flag = false;
        array.forEach(element => {
            if (dateNow === element.date) {
                image.src = element.link;
                nameP.textContent = element.author;
                likesDownload(dateNow);
                flag = true;
            }
        });
        if (!flag) {
            fetchFoto();
        }

    }
}

const renderDateSort = () => {
    if (localStorage.getItem('photoArray')) {
        const array = JSON.parse(localStorage.getItem('photoArray'));
        array.forEach(element => {
            const itemDate = document.createElement('option');
            itemDate.value = element.date;
            itemDate.textContent = element.date;
            dateSort.append(itemDate);
        });
    }
}

dateSort.addEventListener('change', () => {
    perFoto(dateSort.value);
})

const todayDate = new Date().toISOString().slice(0, 10);
perFoto(todayDate);
renderDateSort();




