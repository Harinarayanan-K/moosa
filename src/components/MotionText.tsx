/** The original text stays available to assistive technology as one sentence. */
export default function MotionText({ children }: { children: string }) {
  return <span className="motion-text">
    <span className="sr-only">{children}</span>
    <span aria-hidden="true">{children.split(' ').map((word, i) => <span className="motion-word-mask" key={`${word}-${i}`}><span className="motion-word">{word}</span>{' '}</span>)}</span>
  </span>;
}
