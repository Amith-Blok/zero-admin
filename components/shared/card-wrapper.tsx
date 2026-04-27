import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface ICardWrapperProp {
  cardTitle?: string
  cardDescription?: string
  cardClass?: string
  titleClass?: string
  contentClass?: string
  children: React.ReactNode
}

export const CardWrapper = ({
  cardTitle,
  cardDescription,
  titleClass,
  cardClass,
  contentClass,
  children,
}: ICardWrapperProp) => {
  return (
    <>
      <Card className={cardClass}>
        <CardHeader>
          <CardTitle className={titleClass}>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent className={contentClass}>{children}</CardContent>
      </Card>
    </>
  )
}
