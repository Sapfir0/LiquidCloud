import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { SERVICE_IDENTIFIER } from '../../inversify/inversifyTypes';
import { useInject } from '../../shared/hooks/injectHook';
import { FileUploadStore } from './FileUploadStore';

export const FileUpload = () => {
    const store = useInject<FileUploadStore>(SERVICE_IDENTIFIER.FileUploadStore);

    return (
        <Button variant="contained" component="label" onChange={store.selectFile}>
            Upload File
            <input type="file" hidden />
        </Button>
    );
};
