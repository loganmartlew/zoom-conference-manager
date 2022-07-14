import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import clsx from 'clsx'
import FileUploadDefaultImage from './FileUploadDefaultImage.jpg'

export type FileUploadProps = {
    imageButton?: boolean
    accept: string
    hoverLabel?: string
    dropLabel?: string
    width?: string
    height?: string
    backgroundColor?: string
    image?: {
        url: string
        imageStyle?: {
            width?: string
            height?: string
        }
    }
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onDrop: (event: React.DragEvent<HTMLElement>) => void
}

const useStyle = makeStyles({
    root: {
        cursor: 'pointer',
        textAlign: 'center',
        display: 'flex',
        '&:hover p,&:hover svg,& img': {
            opacity: 1,
        },
        '& p, svg': {
            opacity: 0.4,
        },
        '&:hover img': {
            opacity: 0.3,
        },
    },
    noMouseEvent: {
        pointerEvents: 'none',
    },
    iconText: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
    },
    hidden: {
        display: 'none',
    },
    onDragOver: {
        '& img': {
            opacity: 0.3,
        },
        '& p, svg': {
            opacity: 1,
        },
    },
})

export const FileUpload: React.FC<FileUploadProps> = ({
    accept,
    imageButton = false,
    hoverLabel = 'Click or drag to upload file',
    dropLabel = 'Drop file here',
    width = '600px',
    height = '100px',
    backgroundColor = '#fff',
    image: {
        url = FileUploadDefaultImage,
        imageStyle = {
            height: 'inherit',
        },
    } = {},
    onChange,
    onDrop,
}) => {
    const classes = useStyle()
    const [imageUrl, setImageUrl] = React.useState(url)
    const [labelText, setLabelText] = React.useState<string>(hoverLabel)
    const [isDragOver, setIsDragOver] = React.useState<boolean>(false)
    const [isMouseOver, setIsMouseOver] = React.useState<boolean>(false)
    const stopDefaults = (e: React.DragEvent) => {
        e.stopPropagation()
        e.preventDefault()
    }
    const dragEvents = {
        onMouseEnter: () => {
            setIsMouseOver(true)
        },
        onMouseLeave: () => {
            setIsMouseOver(false)
        },
        onDragEnter: (e: React.DragEvent) => {
            stopDefaults(e)
            setIsDragOver(true)
            setLabelText(dropLabel)
        },
        onDragLeave: (e: React.DragEvent) => {
            stopDefaults(e)
            setIsDragOver(false)
            setLabelText(hoverLabel)
        },
        onDragOver: stopDefaults,
        onDrop: (e: React.DragEvent<HTMLElement>) => {
            stopDefaults(e)
            setLabelText(hoverLabel)
            setIsDragOver(false)
            if (imageButton && e.dataTransfer.files[0]) {
                setImageUrl(URL.createObjectURL(e.dataTransfer.files[0]))
            }
            onDrop(e)
        },
    }
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Object is possibly 'null'.
        if (imageButton && event.target.files[0]) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Object is possibly 'null'.
            setImageUrl(URL.createObjectURL(event.target.files[0]))
        }

        onChange(event)
    }

    return (
        <>
            <input
                onChange={handleChange}
                accept={accept}
                className={classes.hidden}
                id="file-upload"
                type="file"
            />

            <label
                htmlFor="file-upload"
                {...dragEvents}
                className={clsx(classes.root, isDragOver && classes.onDragOver)}
            >
                <Box
                    width={width}
                    height={height}
                    bgcolor={backgroundColor}
                    className={classes.noMouseEvent}
                >
                    {imageButton && (
                        <Box position="absolute" height={height} width={width}>
                            <img
                                alt="file upload"
                                src={imageUrl}
                                style={imageStyle}
                            />
                        </Box>
                    )}

                    {(!imageButton || isDragOver || isMouseOver) && (
                        <>
                            <Box
                                height={height}
                                width={width}
                                className={classes.iconText}
                            >
                                <CloudUploadIcon fontSize="large" />
                                <Typography>{labelText}</Typography>
                            </Box>
                        </>
                    )}
                </Box>
            </label>
        </>
    )
}
