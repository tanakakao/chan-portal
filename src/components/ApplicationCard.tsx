import { ArrowRight } from 'lucide-react'
import type { ApplicationDefinition } from '../types/application'

type ApplicationCardProps = {
  application: ApplicationDefinition
}

type ApplicationCardContentProps = ApplicationDefinition & {
  isAvailable: boolean
}

/**
 * Checks whether a destination is a valid HTTP(S) URL.
 *
 * @param value - Destination value to validate.
 * @returns Whether the value can be used for navigation.
 */
function isValidApplicationUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Renders the visual content shared by enabled and disabled cards.
 *
 * @param props - Application fields and its availability state.
 * @returns The card's visual content.
 */
function ApplicationCardContent({
  displayName,
  projectName,
  description,
  keywords,
  icon: Icon,
  isAvailable,
}: ApplicationCardContentProps) {
  return (
    <>
      <div className="icon-wrap" aria-hidden="true"><Icon size={29} strokeWidth={1.8} /></div>
      <p className="project-name">{projectName}</p>
      <h2>{displayName}</h2>
      <p className="description">{description}</p>
      <ul className="keyword-list" aria-label="主なキーワード">
        {keywords.map((keyword) => <li key={keyword}>{keyword}</li>)}
      </ul>
      <div className="open-label">
        <span>{isAvailable ? '開く' : 'URLが設定されていません'}</span>
        {isAvailable && <ArrowRight size={18} aria-hidden="true" />}
      </div>
    </>
  )
}

/**
 * Renders an accessible navigation card for an analysis application.
 *
 * @param props - Card properties containing the application definition.
 * @returns The application navigation card.
 */
export function ApplicationCard({ application }: ApplicationCardProps) {
  const { displayName, projectName, url, accent } = application
  const isAvailable = isValidApplicationUrl(url)

  return (
    <article className={`application-card application-card--${accent}${isAvailable ? '' : ' application-card--disabled'}`}>
      {isAvailable ? (
        <a className="card-link" href={url} aria-label={`${displayName}（${projectName}）を開く`}>
          <ApplicationCardContent {...application} isAvailable={isAvailable} />
        </a>
      ) : (
        <div className="card-link" aria-label={`${displayName}（${projectName}）はURL未設定です`} aria-disabled="true">
          <ApplicationCardContent {...application} isAvailable={isAvailable} />
        </div>
      )}
    </article>
  )

}
