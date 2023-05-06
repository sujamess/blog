import fs from 'fs';
import path from 'path';

import { config } from 'dotenv';
import { getBlogs } from './blog';

config()

const rootMarkdownDirectory = path.join(process.cwd(), 'src/content/blog')
const stringifyArray = (strings: (string | number)[]) => {
    return `[${strings
        .map(o => (typeof o === 'string' ? `"${o.replace(/\"/g, '\\"')}"` : o))
        .join(', ')}]`
}

    ; (async () => {
        const command = process.argv[process.argv.length - 1]
        switch (command) {
            case 'build':
                const blogPosts = await getBlogs({
                    isPreview: !['true', '1'].includes(process.env.CI ?? ''),
                })

                console.log('writing...')
                await Promise.all(
                    blogPosts.map((blogPost) => {
                        const header = {
                            title: `"${blogPost.title.replace(/\"/g, '\\"')}"`,
                            createdAt: blogPost.createdAt,
                            bannerImg: `\n${[
                                ['url', blogPost.bannerImg.url],
                                ['placeholder', blogPost.bannerImg.placeholder.encoded],
                                ['width', blogPost.bannerImg.width],
                                ['height', blogPost.bannerImg.height],
                                ['blurHashCode', blogPost.bannerImg.placeholder.blurHashCode],
                            ]
                                .map(([key, val]) => `  ${key}: ${val}`)
                                .join('\n')}`,
                            description: blogPost.description,
                            tags: stringifyArray(blogPost.tags),
                        }

                        const builtContent = `---\n${Object.entries(header)
                            .map(([key, val]) => `${key}: ${val}`)
                            .join('\n')}\n---\n\n${blogPost.content}`;
                        return fs.promises.writeFile(
                            path.join(rootMarkdownDirectory, `${blogPost.slug}.md`),
                            builtContent,
                        );
                    }),
                );
                break
            case 'clean':
                await Promise.all(
                    fs
                        .readdirSync(rootMarkdownDirectory)
                        .filter(file => ['.md', '.mdx'].some(o => file.endsWith(o)))
                        .map(file => fs.promises.rm(path.join(rootMarkdownDirectory, file)))
                )
                break
            default:
                console.error(`markdown: does not support ${command} command`)
                process.exit(1)
        }
    })()

export { }
