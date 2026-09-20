import { METADATA } from '../constants'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function updateMetadata({
  title = METADATA.title,
  description = METADATA.description,
  image = '/og-image.jpg',
  url = METADATA.url,
}: SEOProps = {}) {
  document.title = title

  setMeta('description', description)
  setMeta('og:title', title)
  setMeta('og:description', description)
  setMeta('og:image', image)
  setMeta('og:url', url)
  setMeta('twitter:title', title)
  setMeta('twitter:description', description)
  setMeta('twitter:image', image)
}

function setMeta(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)

  if (!element) {
    element = document.createElement('meta')
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      element.setAttribute('property', name)
    } else {
      element.setAttribute('name', name)
    }
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}
