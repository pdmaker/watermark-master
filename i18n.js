let currentLang = 'zh-CN'; // 默认语言

const translations = {
    'zh-CN': {
        title: '简易图片加水印，防盗图称心如意',
        logo: '加水印.com',
        heading: '简易图片加水印，防盗图必备',
        subheading: '快速为多张图片添加自定义水印，一键生成，非常简单易用',
        copyright: '加水印网 Jiashuiyin.com ',
        rights: '保留所有权利',
        friendlyLinks: '友情链接:',
        aiTitleGenerator: 'AI论文标题生成器',
        githubProject: 'GitHub',
        selectImages: '选择图片（最多20张）',
        watermarkText: '水印文字',
        watermarkDensity: '水印密度',
        watermarkColor: '水印颜色',
        watermarkSize: '水印字号(Px)',
        processImages: '处理图片',
        inputWatermarkText: '输入水印文字',
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
        watermarkPosition: '水印位置',
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
    },
    'en': {
        title: 'Batch Image Watermark Tool',
        logo: 'Watermark Adder',
        heading: 'Batch Image Watermark Tool',
        subheading: 'Quickly add custom watermarks to multiple images, generate with one click, very simple and easy to use',
        copyright: 'Batch Image Watermark Tool',
        rights: 'All rights reserved',
        friendlyLinks: 'Friendly Links:',
        aiTitleGenerator: 'AI Research Title Generator',
        githubProject: 'GitHub',
        selectImages: 'Select Images (Max 20)',
        watermarkText: 'Watermark Text',
        watermarkDensity: 'Watermark Density',
        watermarkColor: 'Watermark Color',
        watermarkSize: 'Watermark Size (Px)',
        processImages: 'Process Images',
        inputWatermarkText: 'Enter watermark text',
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
        watermarkPosition: 'Watermark Position',
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
    }
};

function setLanguage(lang) {
    currentLang = lang; // 更新当前语言
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        elem.textContent = translations[lang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(elem => {
        const key = elem.getAttribute('data-i18n-placeholder');
        elem.placeholder = translations[lang][key];
    });
}

function updateURL(lang) {
    const baseURL = window.location.origin;
    const newPath = lang === 'en' ? '/en' : '/';
    history.pushState(null, '', baseURL + newPath);
}
// 导出所需的函数和变量
export { translations, setLanguage, updateURL, currentLang };
