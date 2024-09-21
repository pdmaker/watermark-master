const translations = {
    'zh-CN': {
        title: '批量图片加水印工具',
        logo: '图极客：加水印',
        heading: '批量图片加水印工具',
        subheading: '快速为多张图片添加自定义水印，一键生成，非常简单易用',
        copyright: '批量图片水印工具',
        rights: '保留所有权利',
        friendlyLinks: '友情链接:',
        aiTitleGenerator: 'AI 论文标题生成器',
        githubProject: 'GitHub 项目地址',
        // 添加其他中文翻译
    },
    'en': {
        title: 'Batch Image Watermark Tool',
        logo: 'ImageGeek: Watermark',
        heading: 'Batch Image Watermark Tool',
        subheading: 'Quickly add custom watermarks to multiple images, generate with one click, very simple and easy to use',
        copyright: 'Batch Image Watermark Tool',
        rights: 'All rights reserved',
        friendlyLinks: 'Friendly Links:',
        aiTitleGenerator: 'AI Paper Title Generator',
        githubProject: 'GitHub Project',
        // 添加其他英文翻译
    }
};

function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        elem.textContent = translations[lang][key];
    });
}

function updateURL(lang) {
    const baseURL = window.location.origin;
    const newPath = lang === 'en' ? '/en' : '/';
    history.pushState(null, '', baseURL + newPath);
}

document.getElementById('languageSelector').addEventListener('change', (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    updateURL(lang);
});

// 初始化语言
const urlParams = new URLSearchParams(window.location.search);
const lang = urlParams.get('lang') || (window.location.pathname.includes('/en') ? 'en' : 'zh-CN');
setLanguage(lang);
document.getElementById('languageSelector').value = lang;