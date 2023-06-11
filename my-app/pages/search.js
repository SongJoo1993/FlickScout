import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import {Form, Row, Col, Button} from 'react-bootstrap'

export default function AdvancedSearchForm() {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm();
    // TBC => separate each element as a string elem!
    const genre = [
        "Action,Adventure,Animation,Biography,Comedy,Crime,Documentary,DramaFamily,Fantasy,Film-Noir,Game-Show,History,Horror,Music,Musical,Mystery,News,Reality-TV,Romance,Sci-Fi,Sport,Talk-Show,ThrillerWar,Western"
    ]

    return (
        <Form>
            <Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="e.g. The Matrix" name="q" />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Genre</Form.Label>
                    <Form.Select 
                        as="select" 
                        placeholder="e.g. The Matrix" 
                        name="q" 
                    />
                    <option>Action</option>
                    <option>Drama</option>
                    <option>Comedy</option>
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Cast</Form.Label>
                    <Form.Control type="text" placeholder="e.g. The Matrix" name="q" />
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Directors</Form.Label>
                    <Form.Control type="text" placeholder="e.g. The Matrix" name="q" />
                </Form.Group>
            </Row>
            <Row>
                <Col md={4}>
                <Form.Label>Search By</Form.Label>
                <Form.Select name="searchBy" className="mb-3">
                    <option value="title">Title</option>
                    <option value="tags">Tags</option>
                    <option value="artistOrCulture">Artist or Culture</option>
                </Form.Select>
                </Col>
                <Col md={4}>
                <Form.Group className="mb-3">
                    <Form.Label>Geo Location</Form.Label>
                    <Form.Control type="text" placeholder="" name="geoLocation" />
                    <Form.Text className="text-muted">
                    Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                </Form.Text>
                </Form.Group>
                </Col>
                <Col md={4}>
                <Form.Group className="mb-3">
                    <Form.Label>Medium</Form.Label>
                    <Form.Control type="text" placeholder="" name="medium"/>
                    <Form.Text className="text-muted">
                    Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                </Form.Text>
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Check
                    type="checkbox"
                    label="Highlighted"
                    name="isHighlight"
                />
                <Form.Check
                    type="checkbox"
                    label="Currently on View"
                    name="isOnView"
                />
                </Col>
            </Row>
            <Row>
                <Col>
                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Col>
            </Row>
        </Form>
    )
}