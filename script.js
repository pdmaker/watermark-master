const imageInput = document.getElementById('imageInput');
const watermarkText = document.getElementById('watermarkText');
const watermarkDensity = document.getElementById('watermarkDensity');
const watermarkColor = document.getElementById('watermarkColor');
const watermarkSize = document.getElementById('watermarkSize');
const processButton = document.getElementById('processButton');
const previewContainer = document.getElementById('previewContainer');
const colorPreview = document.getElementById('colorPreview');
const colorPicker = document.getElementById('colorPicker');
const colorPickerContainer = document.getElementById('colorPickerContainer');

processButton.addEventListener('click', processImages);

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
            previewItem.appendChild(previewImg);

            const downloadLink = document.createElement('a');
            const timestamp = new Date().getTime();
            const fileName = `${watermarkText.value}_${timestamp}.png`;
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

// 点击页面其他地方时关闭颜色选择器
document.addEventListener('click', (event) => {
    if (!colorPickerContainer.contains(event.target) && event.target !== colorPreview) {
        colorPickerContainer.classList.add('hidden');
    }
});

initializeColorInput(); // 初始化颜色输和预览

function initializeColorInput() {
    const initialColor = '#808080';
    watermarkColor.value = initialColor;
    colorPicker.value = initialColor;
    colorPreview.style.backgroundColor = initialColor;
}