document.addEventListener('DOMContentLoaded', () => {
    const messages = document.querySelectorAll('.message');

    if ('IntersectionObserver' in window) {
        const options = {
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        messages.forEach((message) => {
            observer.observe(message);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        const revealMessagesFallback = () => {
            messages.forEach((message) => {
                const messagePosition = message.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;

                if (messagePosition < screenPosition) {
                    message.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', revealMessagesFallback);
        revealMessagesFallback(); // Initial check
    }
});
