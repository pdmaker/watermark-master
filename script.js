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

function initializeColorInput() {
    const initialColor = '#e3e3e3';
    watermarkColor.value = initialColor;
    colorPicker.value = initialColor;
    colorPreview.style.backgroundColor = initialColor;
}

// 将所有初始化和事件监听器的设置放在一个函数中
function initialize() {
    initializeColorInput();

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
}

// 确保在 DOM 完全加载后执行初始化
document.addEventListener('DOMContentLoaded', initialize);

function processImages() {
    const files = imageInput.files;
    if (files.length === 0) {
        alert('请选择至少一张图片');
        return;
    }

    const maxFiles = Math.min(files.length, 5);
    previewContainer.innerHTML = ''; // 清空之前的预览

    for (let i = 0; i < maxFiles; i++) {
        processImage(files[i]);
    }
}
function processImage(file) {
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
                alert('请输入有效的颜色值，例如 #000000');
                return;
            }

            ctx.fillStyle = color;
            ctx.font = `${size}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const cellWidth = canvas.width / density;
            const cellHeight = canvas.height / density;

            for (let i = 0; i < density; i++) {
                for (let j = 0; j < density; j++) {
                    const x = cellWidth * (i + 0.5);
                    const y = cellHeight * (j + 0.5);
                    ctx.fillText(text, x, y);
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
            downloadLink.textContent = '下载图片';
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
