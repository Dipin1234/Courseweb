// Tab filtering functionality
const tabs = document.querySelectorAll('.tab');
const items = document.querySelectorAll('.item');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const type = tab.getAttribute('data-type');
    items.forEach(item => {
      item.style.display = type === 'all' ? 'flex' : item.getAttribute('data-type') === type ? 'flex' : 'none';
    });
  });
});

// Button functionality
document.querySelectorAll('.item').forEach(item => {
  const title = item.querySelector('.item-title').textContent;
  const url = item.getAttribute('data-url');
  
  // Download
  item.querySelector('.download').addEventListener('click', () => {
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = title.replace(/[^a-zA-Z0-9]/g, '_') + (item.getAttribute('data-type') === 'video' ? '.mp4' : '.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Download URL not available.');
    }
  });
  
  // Listen (TTS)
  item.querySelector('.listen')?.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(title);
      utterance.lang = 'hi-IN';
      speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in this browser.');
    }
  });
  
  // Bookmark
  item.querySelector('.bookmark').addEventListener('click', () => {
    const isMac = navigator.userAgent.toLowerCase().includes('mac');
    alert(`Press ${isMac ? 'Cmd' : 'Ctrl'}+D to bookmark this page.`);
  });
  
  // Share
  item.querySelector('.share')?.addEventListener('click', async () => {
    if (navigator.share && url) {
      try {
        await navigator.share({
          title: title,
          url: url
        });
        console.log('Content shared successfully');
      } catch (error) {
        console.error('Error sharing:', error.message);
      }
    } else {
      if (url) {
        navigator.clipboard.writeText(url).then(() => {
          alert('URL copied to clipboard!');
        }).catch(() => {
          alert('Failed to copy URL.');
        });
      } else {
        alert('Share URL not available.');
      }
    }
  });
});