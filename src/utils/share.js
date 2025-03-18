export const handleShare = async (e, link) => {
    e.stopPropagation();
    if (navigator.share) {
        try {
            await navigator.share({
                title: document.title,
                text: "Check this out!",
                url: link ? `https://thesupernaturaluniversity.com${link}` : window.location.href,
            });
        } catch (error) {
            console.error("Error sharing:", error);
        }
    } else {
        alert("Sharing is not supported in this browser.");
    }
};