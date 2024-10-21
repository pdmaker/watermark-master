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
const imagePreviewArea = document.getElementById('imagePreviewArea');
const resetButton = document.getElementById('resetButton');
let uploadedFiles = []; // 用于存储已上传的文件

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

    // 添加粘贴区域的事件监听器
    const pasteArea = document.getElementById('pasteArea');
    pasteArea.addEventListener('click', () => imageInput.click());
    pasteArea.addEventListener('paste', handlePaste);
    document.addEventListener('paste', handlePaste);

    updateImagePreview();

    resetButton.addEventListener('click', resetAll);
}

// 确保在 DOM 完全加载后执行初始化
document.addEventListener('DOMContentLoaded', initialize);

function processImages() {
    console.log('Processing images...');
    if (uploadedFiles.length === 0) {
        alert(translations[currentLang].noImagesSelected);
        return;
    }

    const maxFiles = Math.min(uploadedFiles.length, 5);
    previewContainer.innerHTML = ''; // 清空之前的预览

    for (let i = 0; i < maxFiles; i++) {
        processImage(uploadedFiles[i]);
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
    const pasteArea = document.getElementById('pasteArea');
    const fileNameDisplay = document.createElement('span');

    fileNameDisplay.className = 'mt-2 text-gray-600 block';
    fileNameDisplay.setAttribute('data-i18n', 'noFileChosen');
    fileNameDisplay.textContent = translations[currentLang].noFileChosen;

    pasteArea.parentNode.insertBefore(fileNameDisplay, pasteArea.nextSibling);

    fileInput.addEventListener('change', () => {
        const newFiles = Array.from(fileInput.files);
        uploadedFiles = uploadedFiles.concat(newFiles);
        updateFileInput();
        updateFileNameDisplay();
        updateImagePreview();
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

// 处理粘贴事件的函数
function handlePaste(e) {
    e.preventDefault();
    e.stopPropagation();

    const items = e.clipboardData.items;
    const newFiles = [];

    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            const blob = items[i].getAsFile();
            newFiles.push(blob);
        }
    }

    if (newFiles.length > 0) {
        uploadedFiles = uploadedFiles.concat(newFiles);
        updateFileInput();
        updateFileNameDisplay();
        updateImagePreview();
    }
}

// 更新文件名显示的函数
function updateFileNameDisplay() {
    const fileNameDisplay = document.querySelector('span[data-i18n="noFileChosen"]');
    
    if (uploadedFiles.length > 0) {
        const fileCount = uploadedFiles.length;
        const filesSelectedText = fileCount === 1 
            ? translations[currentLang].fileSelected 
            : translations[currentLang].filesSelected;
        fileNameDisplay.textContent = `${fileCount} ${filesSelectedText}`;
    } else {
        fileNameDisplay.textContent = translations[currentLang].noFileChosen;
    }
}

// 添加新的函数来更新图片预览
function updateImagePreview() {
    imagePreviewArea.innerHTML = ''; // 清空现有预览

    uploadedFiles.forEach((file, index) => {
        if (index < 5) { // 限制最多显示5个预览
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'w-16 h-16 object-cover rounded';
                imagePreviewArea.appendChild(img);
            }
            reader.readAsDataURL(file);
        }
    });
}

// 添加重置函数
function resetAll() {
    uploadedFiles = [];
    updateFileInput();
    updateFileNameDisplay();
    updateImagePreview();
    document.getElementById('watermarkText').value = '';
    document.getElementById('watermarkDensity').value = '3';
    document.getElementById('watermarkColor').value = '#e3e3e3';
    document.getElementById('watermarkSize').value = '20';
    updateColorPreview();
    previewContainer.innerHTML = '';
}

// 添加新的函数来更新文件输入
function updateFileInput() {
    const dt = new DataTransfer();
    uploadedFiles.forEach(file => dt.items.add(file));
    document.getElementById('imageInput').files = dt.files;
}
