import HtmlWP, { HtmlTagObject } from 'html-webpack-plugin'
import { Compiler } from 'webpack'

import { BASE_DIR, APP_DIR, resolve } from './path'

const HtmlPG = new HtmlWP({
    filename: resolve(BASE_DIR, 'ShareWith/templates/index.html'),
    template: resolve(APP_DIR, 'public/django.html'),
    inject: true,
    publicPath: '/dist/',
    minify: false,
})

type TS = (s: unknown) => string | 'return' | false
const TagSource: TS = s => {
    if (typeof s === 'string') {
        if (s.startsWith('http') || s.startsWith('//')) return 'return'
        return s.at(0) === '/' ? s.slice(1) : s
    }
    return false
}

type GS = (list: HtmlTagObject[]) => typeof list
const GetStatics: GS = list =>
    list.map(item => {
        let source_key: string

        if (item.tagName === 'script') source_key = 'src'
        else if (item.tagName === 'link') source_key = 'href'
        else return item

        let source = TagSource(item.attributes[source_key])

        if (source === 'return') return item
        if (!source) throw Error('error to handle the source')

        item.attributes[source_key] = `{% static '${source}' %}`

        return item
    })

class HtmlStatics {
    apply(compiler: Compiler) {
        compiler.hooks.compilation.tap('HtmlStatics', compilation => {
            HtmlWP.getHooks(compilation).alterAssetTagGroups.tapAsync(
                'HtmlStatics',
                (data, callback) => {
                    data.bodyTags = GetStatics(data.bodyTags)
                    data.headTags = GetStatics(data.headTags)

                    callback(null, data)
                }
            )
        })
    }
}

export default [HtmlPG, new HtmlStatics()]
