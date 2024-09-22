import { translations, setLanguage, updateURL, currentLang } from './i18n.js';

const imageInput = document.getElementById('imageInput');
const watermarkText = document.getElementById('watermarkText');
const watermarkDensity = document.getElementById('watermarkDensity');
const watermarkColor = document.getElementById('watermarkColor');
const watermarkSize = document.getElementById('watermarkSize');
const processButton = document.getElementById('processButton');
const previewContainer = document.getElementById('previewContainer');
const colorPreview = document.getElementById('colorPreview');
const colorPicker = document.getElementById('colorPicker');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const languageSelector = document.getElementById('languageSelector');
const processingLoader = document.getElementById('processingLoader');

function initializeColorInput() {
    const initialColor = '#e3e3e3';
    watermarkColor.value = initialColor;
    colorPicker.value = initialColor;
    colorPreview.style.backgroundColor = initialColor;
}

// 将所有初始化和事件监听器的设置放个函数中
function initialize() {
    initializeColorInput();
    initializeFileInput();
    processButton.addEventListener('click', processImages);
    watermarkColor.addEventListener('input', updateColorPreview);
    colorPreview.addEventListener('click', () => colorPicker.click());
    colorPicker.addEventListener('input', () => {
        watermarkColor.value = colorPicker.value;
        updateColorPreview();
    });
    imageModal.addEventListener('click', function() {
        console.log('Modal clicked'); // 添加调试日志
        this.classList.add('hidden');
    });

    // 添加这行代码来检查元素是否正确获取
    console.log('imageModal element:', imageModal);
    console.log('modalImage element:', modalImage);

    languageSelector.addEventListener('change', (e) => {
        const lang = e.target.value;
        setLanguage(lang);
        updateURL(lang);
    });

    // 初始化语言
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang') || (window.location.pathname.includes('/en') ? 'en' : 'zh-CN');
    setLanguage(lang);
    languageSelector.value = lang;

    updateDensityOptions();
}

// 确保在 DOM 完全加载后执行初始化
document.addEventListener('DOMContentLoaded', initialize);

function processImages() {
    console.log('Processing images...'); // 添加日志
    const files = imageInput.files;
    if (files.length === 0) {
        alert(translations[currentLang].noImagesSelected);
        return;
    }

    const maxFiles = Math.min(files.length, 5);
    previewContainer.innerHTML = ''; // 清空之前的预览

    for (let i = 0; i < maxFiles; i++) {
        processImage(files[i]);
    }
}
function processImage(file) {
    console.log('Processing image:', file.name);
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');

            // 绘制原图
            ctx.drawImage(img, 0, 0);

            // 添加水印
            const text = watermarkText.value;
            const density = parseInt(watermarkDensity.value);
            const color = watermarkColor.value;
            const size = parseInt(watermarkSize.value);

            if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
                alert(translations[currentLang].invalidColorValue);
                return;
            }

            ctx.fillStyle = color;
            ctx.font = `${size}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // 设置旋转角度（逆时针45度）
            const angle = -Math.PI / 4;

            // 计算每个格子的大小
            const cellWidth = canvas.width / density;
            const cellHeight = canvas.height / density;

            // 绘制水印
            for (let i = 0; i < density; i++) {
                for (let j = 0; j < density; j++) {
                    // 计算每个格子的中心点
                    const x = (i + 0.5) * cellWidth;
                    const y = (j + 0.5) * cellHeight;

                    // 保存当前上下文状态
                    ctx.save();

                    // 移动到水印位置（格子中心）
                    ctx.translate(x, y);

                    // 旋转画布
                    ctx.rotate(angle);

                    // 绘制旋转后的水印
                    ctx.fillText(text, 0, 0);

                    // 恢复画布状态
                    ctx.restore();
                }
            }

            // 创建预览项
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';

            const previewImg = document.createElement('img');
            previewImg.src = canvas.toDataURL();
            previewImg.style.maxWidth = '100%';
            previewImg.style.cursor = 'pointer';
            previewImg.addEventListener('click', function() {
                console.log('Image clicked'); // 添加调试日志
                modalImage.src = this.src;
                imageModal.classList.remove('hidden');
                console.log('Modal should be visible now'); // 添加调试日志
            });
            previewItem.appendChild(previewImg);

            // 添加这个新函数来生成格式化的时间戳
            function getFormattedTimestamp() {
                const now = new Date();
                return now.getFullYear() +
                       String(now.getMonth() + 1).padStart(2, '0') +
                       String(now.getDate()).padStart(2, '0') +
                       String(now.getHours()).padStart(2, '0') +
                       String(now.getMinutes()).padStart(2, '0');
            }

            // 修改文件命名逻辑
            const timestamp = getFormattedTimestamp();
            const originalFileName = file.name.split('.').slice(0, -1).join('.'); // 获取原始文件名（不包括扩展名）
            const fileName = `${originalFileName}_${timestamp}.png`;
            
            const downloadLink = document.createElement('a');
            downloadLink.href = canvas.toDataURL('image/png');
            downloadLink.download = fileName;
            downloadLink.textContent = translations[currentLang].downloadImage;
            previewItem.appendChild(downloadLink);

            previewContainer.appendChild(previewItem);
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(file);
}

// 添加这个函数
function updateColorPreview() {
    const color = watermarkColor.value;
    if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
        colorPreview.style.backgroundColor = color;
        colorPicker.value = color;
        watermarkColor.style.borderColor = '#e2e8f0'; // 重置边框颜色
    } else {
        colorPreview.style.backgroundColor = '#ffffff';
        watermarkColor.style.borderColor = '#f56565'; // 设置红色边框表示无效输入
    }
}

// 在文件底部添加这些事件监听器
watermarkColor.addEventListener('input', updateColorPreview);
colorPreview.addEventListener('click', () => colorPicker.click());
colorPicker.addEventListener('input', () => {
    watermarkColor.value = colorPicker.value;
    updateColorPreview();
});

// 确保这段代码在文件末尾
imageModal.addEventListener('click', function() {
    console.log('Modal clicked'); // 添加调试日志
    this.classList.add('hidden');
});

// 添加这行代码来检查元素是否正确获取
console.log('imageModal element:', imageModal);
console.log('modalImage element:', modalImage);

function initializeFileInput() {
    const fileInput = document.getElementById('imageInput');
    const fileInputLabel = document.querySelector('label[for="imageInput"]');
    const customFileButton = document.createElement('button');
    const fileNameDisplay = document.createElement('span');

    customFileButton.type = 'button';
    customFileButton.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
    customFileButton.setAttribute('data-i18n', 'chooseFile');
    customFileButton.textContent = translations[currentLang].chooseFile;

    fileNameDisplay.className = 'ml-3 text-gray-600';
    fileNameDisplay.setAttribute('data-i18n', 'noFileChosen');
    fileNameDisplay.textContent = translations[currentLang].noFileChosen;

    fileInputLabel.parentNode.insertBefore(customFileButton, fileInputLabel.nextSibling);
    fileInputLabel.parentNode.insertBefore(fileNameDisplay, customFileButton.nextSibling);
    fileInput.style.display = 'none';

    customFileButton.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            const fileCount = fileInput.files.length;
            const filesSelectedText = fileCount === 1 
                ? translations[currentLang].fileSelected 
                : translations[currentLang].filesSelected;
            fileNameDisplay.textContent = `${fileCount} ${filesSelectedText}`;
        } else {
            fileNameDisplay.textContent = translations[currentLang].noFileChosen;
        }
    });
}

processButton.addEventListener('click', async () => {
    // 显示处理中的 loader
    processingLoader.style.display = 'block';
    processButton.disabled = true;

    try {
        // 这里是您处理图片的代码
        // await processImages();
    } catch (error) {
        console.error('处理图片时出错:', error);
    } finally {
        // 隐藏处理中的 loader
        processingLoader.style.display = 'none';
        processButton.disabled = false;
    }
});
