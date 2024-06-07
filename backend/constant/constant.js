// nodemailer
exports.serviceName = 'gmail';
exports.emailSubject = 'Verify your email';

// User image storage configuration
exports.USER_IMAGE_FOLDER = 'e-commerce/users';
exports.USER_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'gif'];
exports.USER_IMAGE_TRANSFORMATION = [{ width: 500, height: 500, crop: 'fill' }];

// Product image storage configuration
exports.PRODUCT_IMAGE_FOLDER = 'e-commerce/products';
exports.PRODUCT_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'gif'];
exports.PRODUCT_IMAGE_TRANSFORMATION = [{ width: 500, height: 500, crop: 'fill' }];
