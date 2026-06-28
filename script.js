document.addEventListener('DOMContentLoaded', function () {

    const gallery = document.querySelector('.gallery');
    const preview = document.querySelector('.preview');
    const closeButton = document.querySelector('.preview-close');
    const photoTabs = document.querySelector('.photo-tabs');

    function showPreview(image) {
        if (!preview) return;
        preview.src = image.dataset.large || image.src;
        preview.alt = image.alt || 'Image preview';
        preview.classList.add('active');
    }

    function hidePreview() {
        if (!preview) return;
        preview.classList.remove('active');
    }

    function filterPhotos(category) {
        if (!gallery) return;
        const images = gallery.querySelectorAll('img');
        images.forEach((img) => {
            const imgCategory = img.dataset.category || 'all';
            const item = img.closest('.gallery-item') || img;
            if (category === 'all' || imgCategory === category) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    if (photoTabs) {
        photoTabs.addEventListener('click', function (event) {
            const tab = event.target.closest('[data-category]');
            if (!tab) return;
            const category = tab.dataset.category;
            filterPhotos(category);
            const tabs = photoTabs.querySelectorAll('[data-category]');
            tabs.forEach((t) => t.classList.toggle('active', t === tab));
        });
    }

    if (gallery) {
        gallery.addEventListener('click', function (event) {
            const image = event.target.closest('img');
            if (!image) return;
            showPreview(image);
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', hidePreview);
    }

    if (preview) {
        preview.addEventListener('click', hidePreview);
    }

    filterPhotos('all');
});
