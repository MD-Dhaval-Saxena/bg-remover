const imageInput = document.getElementById('imageInput');
const previewImg = document.getElementById('previewImg');

imageInput.addEventListener('change', function() {
  const file = this.files[0];
  
  if (file) {
    previewImg.src = URL.createObjectURL(file);
    
    // Get file path
    const filePath = file.path;
    
    // Use filePath variable to store path somewhere
    console.log(filePath); 
  }
});