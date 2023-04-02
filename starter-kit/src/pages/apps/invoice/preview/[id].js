// ** Third Party Imports
import axios from 'axios'

// ** Demo Components Imports
import Preview from 'src/views/apps/invoice/preview/Preview'

const InvoicePreview = ({ id }) => {
  return <Preview id={id} />
}

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:4003/api/invoices')
  const data = await res.json()

  const paths = data.map(item => ({
    params: { id: `${item._id}` }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = ({ params }) => {
  return {
    props: {
      id: params?.id
    }
  }
}

export default InvoicePreview
