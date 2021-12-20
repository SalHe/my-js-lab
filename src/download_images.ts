import request from 'request';
import fs from 'fs';

const images = ['https://view.taodocs.com/img/xR9349qKi_WQtRU7o2dBqAfAD3yjd8SY', 'https://view.taodocs.com/img/xR9349qKi_WLp9M22s4FNrAP@XRWmruc', 'https://view.taodocs.com/img/xR9349qKi_VVVe2cUF@q3Upew6rre5L3', 'https://view.taodocs.com/img/xR9349qKi_XurQXxmgKQFssW7MfZBVBi', 'https://view.taodocs.com/img/xR9349qKi_UMOLEALEflAlFb024c9kt0', 'https://view.taodocs.com/img/xR9349qKi_XINQxAFn2NTnJ_dPwLmXum', 'https://view.taodocs.com/img/xR9349qKi_V5bsk93ba3I1aqkU4y12FI', 'https://view.taodocs.com/img/xR9349qKi_UnK82p2Vy@F8PjOZW_iMdm', 'https://view.taodocs.com/img/xR9349qKi_XW_8fPhUTeY@gafZ_WE9JE', 'https://view.taodocs.com/img/xR9349qKi_VGIQP0gYQsVlUXdllyPA6V', 'https://view.taodocs.com/img/xR9349qKi_X9bEQI@6uPVZ@IlcR1ckuP', 'https://view.taodocs.com/img/xR9349qKi_XeTS5WocNZe6Rx0Orh93_p', 'https://view.taodocs.com/img/xR9349qKi_UDOkRC2ic9_PtWRzqHF9i4', 'https://view.taodocs.com/img/xR9349qKi_Xx@zn8JjpSu@glq0vU8Wvj', 'https://view.taodocs.com/img/xR9349qKi_WuPsqsqDRCvfGRFzki2TTQ', 'https://view.taodocs.com/img/xR9349qKi_UlYLRoosBjz_FFIrbzH0Ja', 'https://view.taodocs.com/img/xR9349qKi_WVRHJ8hJKPKigmOPLsIM8Z', 'https://view.taodocs.com/img/xR9349qKi_WE@3JqQPVAzdIh_79Kkja5', 'https://view.taodocs.com/img/xR9349qKi_VtAbMLgGZXuxKt_blgEVVl', 'https://view.taodocs.com/img/xR9349qKi_X4cIVquhCpD3fGQIPZLO@Z', 'https://view.taodocs.com/img/xR9349qKi_VujaiyZ0dXcwRacasfWoLw', 'https://view.taodocs.com/img/xR9349qKi_UOvIeNnTks_a3bOkk@11Sl', 'https://view.taodocs.com/img/xR9349qKi_WCAtg83vxtp2umjNL5Mqzt', 'https://view.taodocs.com/img/xR9349qKi_VTb0q@ug10ISgBLEtNofX8'];
for (let i = 0; i < images.length; i++) {
    request
        .get(images[i])
        .on('error', req => {
            console.log(`Failed to download image${i}: ${images[i]}`);
        })
        .pipe(fs.createWriteStream(`./images/${i + 1}.jpg`));
}