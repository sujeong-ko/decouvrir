import AWS, { S3 } from 'aws-sdk';
import multerS3 from 'multer-s3';
import multer from 'multer';
import { Router } from 'express';
import 'dotenv/config';

const imageRouter = Router();

const s3 = new S3(
    {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    }
);

const imageUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'decouvrir',
        key: function(req, file, cb){
            const extention = file.mimetype.split('/')[1];
            if(!['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(extention)){
                return cb(new Error('이미지 파일을 등록해주세요.'));
            }
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    }), acl: 'public-read-write',
});

router.post('/upload', imageUpload.single('image'), async(req, res, next)=> {
    try{
        console.log(req.file);
        console.log(req.file.location);
        res.json({
            message: '이미지 저장 성공',
            imagePath: req.file.location,
        })
    } catch(err){
        next(err);
    }
})

export { imageRouter };