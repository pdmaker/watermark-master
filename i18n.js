let currentLang = 'zh-CN'; // 默认语言

const translations = {
    'zh-CN': {
        title: '简易图片加水印，防盗图必备',
        logo: '加水印.com',
        heading: '简易图片加水印，防盗图必备',
        subheading: '快速为多张图片添加自定义水印，一键生成，非常简单易用',
        copyright: '加水印网 Jiashuiyin.com',
        rights: '保留所有权利；',
        friendlyLinks: '友情链接',
        RefHide: '隐私网址生成器',
        aiTitleGenerator: 'AI论文标题生成器',
        iframeGenerator: '网页iframe生成器',
        githubProject: 'GitHub',
        selectImages: '选择图片（最多20张）',
        watermarkText: '文字',
        watermarkDensity: '密度',
        watermarkColor: '颜色',
        watermarkSize: '字号(Px)',
        processImages: '处理图片',
        inputWatermarkText: '输入水印文字，可回车换行',
        chooseFile: '选择图片',
        noFileChosen: '未选择图片',
        downloadImage: '下载图片',
        invalidColorValue: '请输入有效的颜色值，例如 #000000',
        noImagesSelected: '请选择至少一张图片',
        filesSelected: '张图片已选择',
        fileSelected: '张图片已选择',
        filesSelected: '张图片已选择',
        pasteAreaText: '点击上传或直接粘贴图片',
        resetButton: '重置',
        watermarkResults: '加水印结果',
        downloadAll: '一键全部下载',
        noImagesToDownload: '没有可下载的图片',
        processImagesShort: '处理',
        resetButtonShort: '重置',
        watermarkPosition: '位置',
        watermarkPositionTile: '整体平铺',
        watermarkPositionBottomRight: '右下角',
        watermarkPositionBottomLeft: '左下角',
        watermarkPositionTopRight: '右上角',
        watermarkPositionTopLeft: '左上角',
        singleWatermark: '1个水印',
        twoByTwo: '2x2 (4个水印)',
        threeByThree: '3x3 (9个水印)',
        fourByFour: '4x4 (16个水印)',
        fiveByFive: '5x5 (25个水印)',
        sixBySix: '6x6 (36个水印)',
        copyToClipboard: '复制到剪贴板',
        imageCopied: '图片已复制到剪贴板',
        copyFailed: '复制失败，请重试',
        contactEmail: '欢迎联系反馈：',
        emailAddress: 'hi@jiashuiyin.com',
        howToUse: '如何高效加水印？',
        step1: '选择或粘贴图片（支持最多20张图片同时处理）',
        step2: '输入想要添加的水印文字',
        step3: '选择水印位置（整体平铺或四个角落之一）',
        step4: '调整水印密度（仅平铺模式）、颜色和大小',
        step5: '点击"处理图片"按钮生成水印',
        step6: '预览效果，可以直接下载或复制到剪贴板',
        step7: '使用"一键全部下载"批量保存所有处理后的图片',
        quickStep1: '上传图片',
        quickStep1Detail: '多选或直接粘贴',
        quickStep2: '输入水印',
        quickStep2Detail: '自定义水印文字',
        quickStep3: '一键处理',
        quickStep3Detail: '导出带水印图片',
        detailedSteps: '详细步骤',
        watermarkOpacity: '透明度(%)',
        qaTitle: '常见问题解答',
        qa1Title: '为什么选择「加水印」网站？',
        qa1Answer: '产品简单易用，批量处理更高效，用户体验优良。完全在本地浏览器运行，无需上传文件到服务器，确保用户隐私安全。支持多种水印样式和位置，满足不同场景需求。',
        qa2Title: '为什么说「加水印」网站可以保护使用者隐私？',
        qa2Answer: '所有图片处理都在用户本地浏览器中完成，不会上传到任何服务器。源文件和处理后的文件都只存在于用户设备中，确保敏感信息的安全性。同时，网站完全免费，无需注册账号，不收集任何用户信息。',
        qa3Title: '「加水印」有什么典型的用户场景？',
        qa3Answer: '主要应用场景包括：1) 私域运营的素材保护，适合电商品牌运营人员和微商从业者；2) 敏感文件保护，如身份证、营业执照等证件的水印添加；3) 摄影作品版权保护；4) 产品图片、宣传材料的品牌 Logo 添加。',
        watermarkPositionCenter: '居中',
        retirementCountdown: '退休倒计时',
        blogLink: '博客',
        privacyPolicy: '隐私政策',
        termsConditions: '使用条款',
        keyboardCounter: '键盘计数器',
        logoShort: '加水印',
        openUrlsBatch: '批量打开网页',
        maxLinesReached: '最多只能输入3行文本',
        reusePrevious: '填入上一次：',
        noHistory: '暂无历史记录',
    },
    'en': {
        title: 'Batch Image Watermark Tool',
        logo: 'Watermark Adder',
        heading: 'Batch Image Watermark Tool',
        subheading: 'Quickly add custom watermarks to multiple images, generate with one click, very simple and easy to use',
        copyright: 'Batch Image Watermark Tool, ',
        rights: 'All rights reserved. ',
        friendlyLinks: 'Friendly Links:',
        RefHide: 'Hide your referrer',
        aiTitleGenerator: 'AI Research Title Generator',
        iframeGenerator: 'Webpage Iframe Generator',
        githubProject: 'GitHub',
        selectImages: 'Select Images (Max 20)',
        watermarkText: 'Text',
        watermarkDensity: 'Density',
        watermarkColor: 'Color',
        watermarkSize: 'Font Size (Px)',
        processImages: 'Process Images',
        inputWatermarkText: 'Enter watermark text, press Enter for new line',
        chooseFile: 'Choose File',
        noFileChosen: 'No image chosen',
        downloadImage: 'Download Image',
        invalidColorValue: 'Please enter a valid color value, e.g. #000000',
        noImagesSelected: 'Please select at least one image',
        filesSelected: 'images selected',
        fileSelected: 'image selected',
        filesSelected: 'images selected',
        pasteAreaText: 'Click to upload or paste images directly',
        resetButton: 'Reset',
        watermarkResults: 'Watermark Results',
        downloadAll: 'Download All',
        noImagesToDownload: 'No images to download',
        processImagesShort: 'Process',
        resetButtonShort: 'Reset',
        watermarkPosition: 'Position',
        watermarkPositionTile: 'Tile',
        watermarkPositionBottomRight: 'Bottom Right',
        watermarkPositionBottomLeft: 'Bottom Left',
        watermarkPositionTopRight: 'Top Right',
        watermarkPositionTopLeft: 'Top Left',
        singleWatermark: '1 watermark',
        twoByTwo: '2x2 (4 watermarks)',
        threeByThree: '3x3 (9 watermarks)',
        fourByFour: '4x4 (16 watermarks)',
        fiveByFive: '5x5 (25 watermarks)',
        sixBySix: '6x6 (36 watermarks)',
        copyToClipboard: 'Copy to Clipboard',
        imageCopied: 'Image copied to clipboard',
        copyFailed: 'Copy failed, please try again',
        contactEmail: 'Contact: ',
        emailAddress: 'hi@jiashuiyin.com',
        howToUse: 'How to Use Watermark Adder',
        step1: 'Select or paste images (up to 20 images at once)',
        step2: 'Enter your watermark text',
        step3: 'Choose watermark position (tile or corners)',
        step4: 'Adjust density (tile mode only), color and size',
        step5: 'Click "Process Images" button',
        step6: 'Preview results, download or copy to clipboard',
        step7: 'Use "Download All" for batch downloading',
        quickStep1: 'Upload',
        quickStep1Detail: 'Select or paste images',
        quickStep2: 'Add Text',
        quickStep2Detail: 'Set watermark text',
        quickStep3: 'Process',
        quickStep3Detail: 'Export with watermark',
        detailedSteps: 'Detailed Steps',
        watermarkOpacity: 'Opacity(%)',
        qaTitle: 'FAQ',
        qa1Title: 'Why choose Jiashuiyin.com?',
        qa1Answer: 'Simple to use, efficient batch processing, and excellent user experience. All processing is done locally in the browser, ensuring privacy. Supports various watermark styles and positions to meet different needs.',
        qa2Title: 'How does Jiashuiyin.com protect user privacy?',
        qa2Answer: 'All image processing is done in your local browser, no files are uploaded to any server. Both source files and processed files remain only on your device, ensuring the security of sensitive information. The website is completely free, no registration required, and we collect no user information.',
        qa3Title: 'What are the typical use cases?',
        qa3Answer: '1) Protecting marketing materials for private domain operations, popular among e-commerce brand operators; 2) Protecting sensitive documents like ID cards and business licenses; 3) Copyright protection for photography works; 4) Adding brand identifiers to product images and promotional materials.',
        watermarkPositionCenter: 'Center',
        retirementCountdown: 'Retirement Countdown',
        blogLink: 'Blog',
        privacyPolicy: 'Privacy Policy',
        termsConditions: 'Terms & Conditions',
        keyboardCounter: 'Keyboard Counter',
        logoShort: 'WM Adder',
        openUrlsBatch: 'Batch Open URLs',
        maxLinesReached: 'Maximum 3 lines allowed',
        reusePrevious: 'Reuse last: ',
        noHistory: 'No history',
    }
};

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // 如果当前语言与页面不匹配，直接跳转
    const currentPath = window.location.pathname;
    const shouldBeInEn = lang === 'en';
    const isInEn = currentPath.startsWith('/en');
    
    if (shouldBeInEn !== isInEn) {
        // 需要切换页面
        const baseURL = window.location.origin;
        const newPath = shouldBeInEn ? '/en' : '/';
        window.location.href = baseURL + newPath;
        return;
    }

    // 如果语言匹配当前页面，则更新内容
    try {
        document.querySelectorAll('[data-i18n]').forEach(elem => {
            const key = elem.getAttribute('data-i18n');
            if (translations[lang][key]) {
                elem.textContent = translations[lang][key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(elem => {
            const key = elem.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                elem.placeholder = translations[lang][key];
            }
        });

        // 更新元数据
        updateMetadata(lang);

        // 更新语言选择器的值
        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
            languageSelector.value = lang;
        }

        // 移除loading状态
        const pageLoader = document.getElementById('pageLoader');
        if (pageLoader) {
            pageLoader.style.display = 'none';
        }
    } catch (error) {
        console.error('Error updating language:', error);
        // 确保即使出错也移除loading状态
        const pageLoader = document.getElementById('pageLoader');
        if (pageLoader) {
            pageLoader.style.display = 'none';
        }
    }
}

// 添加更新元数据的函数
function updateMetadata(lang) {
    // 更新标题
    document.title = translations[lang].title + (lang === 'en' ? ' - Watermark Adder' : ' - 加水印');

    // 更新 meta 描述
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = lang === 'en' 
            ? 'Watermark Adder is a simple online tool for adding watermarks to images. Support batch processing, custom watermark text, position, color, and size. Protect your images from unauthorized use. Free, no registration required.'
            : '加水印.com 是一款简单易用的在线图片加水印工具。支持批量处理、自定义水印文字、位置、颜色和大小。保护您的图片，防止盗图。完全免费，无需注册。';
    }

    // 更新 Open Graph 标签
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');

    if (ogTitle) {
        ogTitle.content = document.title;
    }
    if (ogDescription) {
        ogDescription.content = metaDescription?.content;
    }
    if (ogUrl) {
        ogUrl.content = window.location.origin + (lang === 'en' ? '/en' : '/');
    }

    // 更新规范链接
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
        canonical.href = window.location.origin + (lang === 'en' ? '/en' : '/');
    }
}

function updateURL(lang) {
    const baseURL = window.location.origin;
    const newPath = lang === 'en' ? '/en' : '/';
    window.history.replaceState(null, '', baseURL + newPath);
}

// 修改初始化函数
function initializeLanguage() {
    // 根据当前路径确定语言
    const path = window.location.pathname;
    const urlLang = path.startsWith('/en') ? 'en' : 'zh-CN';
    
    // 设置初始语言
    currentLang = urlLang;
    document.documentElement.lang = urlLang;
    
    // 设置语言选择器
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
        languageSelector.value = urlLang;
    }

    // 添加语言切换事件监听
    languageSelector?.addEventListener('change', (e) => {
        const newLang = e.target.value;
        setLanguage(newLang);
    });
}

// 在 DOMContentLoaded 时初始化语言
document.addEventListener('DOMContentLoaded', initializeLanguage);

// 导出所需的函数和变量
export { translations, setLanguage, updateURL, currentLang };
