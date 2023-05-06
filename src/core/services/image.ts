import type { Image } from '@core/constants/image';
import { encode, decode } from 'blurhash';
import sharp from 'sharp';

export interface BlurHashResponse {
    blurHashCode: string;
    encoded: string;
}

export const getBlurHash = async (image: Image, retryAttempts: number = 1, fetchedImage?: ArrayBuffer): Promise<BlurHashResponse> => {
    try {
        // fetch an image
        if (!fetchedImage) {
            fetchedImage = await(await fetch(image.placeholder)).arrayBuffer();
        }

        // encode blur hash
        const { data, info: { width, height }} = await sharp(Buffer.from(fetchedImage))
            .raw()
            .ensureAlpha()
            .toBuffer({ resolveWithObject: true });
        const blurHash = encode(new Uint8ClampedArray(data), width, height, 4, 3);

        // decode
        const decodedImageSize =
            width > height
                ? {
                    width: 8,
                    height: Math.round(8 * (Number(height) / Number(width))),
                }
                : {
                    width: Math.round(8 * (Number(height) / Number(width))),
                    height: 8,
                };
        const pixels = decode(blurHash, decodedImageSize.width, decodedImageSize.height);

        const resizedImageBuf = await sharp(Buffer.from(pixels), {
            raw: {
                channels: 4,
                width: decodedImageSize.width,
                height: decodedImageSize.height,
            },
        })
            .jpeg({ overshootDeringing: true, quality: 40 })
            .toBuffer();

        return {
            blurHashCode: blurHash,
            encoded: `data:image/jpeg;base64,${resizedImageBuf.toString('base64')}`,
        };
    } catch (e) {
        if (retryAttempts < 3) {
            console.log(`blurhash: failed to blur hash, #${retryAttempts}`)
            await new Promise((resolve) => setTimeout(resolve, 10_000));
            return getBlurHash(image, retryAttempts + 1, fetchedImage);
        } else {
            console.error(e)
            throw `blurhash: failed to blur hash: ${e}`
        }
    }
}