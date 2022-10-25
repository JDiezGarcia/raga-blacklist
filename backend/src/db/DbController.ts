import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

class DbController {

    static uploadDb = async (req: Request, res: Response) => {
        if(!req.files || Object.keys(req.files).length === 0) {
            res.status(404).send({ error: { validators: {upload: 'You need to upload a file'}}});
            return;
        } 
        const sqlFile = req.files.sql as UploadedFile;
        const uploadPath = 'src/db/raga-blacklist.sqlite';
        sqlFile.mv(uploadPath, function (err) {
            if (err) {
                res.status(404).send({error: {upload: 'Error uploading file'}});
                return;
            }
            res.status(200).send({success: "Successfully Uploaded!"});
        });
    };

    static downloadDb = async (req: Request, res: Response) => {
        const sqlPath = 'src/db/raga-blacklist.sqlite';
        res.status(200).download(sqlPath, (err) => {
            if(err){
                res.status(404).send({error: {download: 'Error downloading file'}})
            }
        });
    };
};

export default DbController;