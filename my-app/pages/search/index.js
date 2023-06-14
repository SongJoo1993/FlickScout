import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import {Form, Row, Col, Button} from 'react-bootstrap'
import {genres, languages, countries, ranges} from '../../public/searchItem'

export default function AdvancedSearchForm() {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            title: "",
            director: "",
            cast: "",
            runTimeFrom: 0,
            runTimeTo: 0,
            genre: [],
            country: "",
            language: "",
            fromRate: "",
            toRate: "",
            fromDate: "", 
            toDate: "",
        }
    });

    function queryGenerator(data) {
        let queryStr = "";
        console.log(data);
        for(const property in data) {
            if ( typeof data[property] === "string" && data[property].length > 0) {
                queryStr += `${property}=${data[property]}&`;
            } 
            else if (
                props === "genre" && 
                data[property].length > 0) {
                data[property].forEach(element => {
                    queryStr += `${property}=${element}&`;
                });
            }
        }
        queryStr = queryStr.substring(0, queryStr.length-1);
        router.push(`/results?${queryStr}`);
    }

    function submitForm(data, event) {
        event.preventDefault();
        queryGenerator(data);
    }

    // after submit -> route to a page with all results (cards)


    return (
        <Form onSubmit={handleSubmit(submitForm)}>
            <Row>
                <Form.Group as={Col} className="mb-1">
                    <strong><Form.Label>Title</Form.Label></strong>
                    <Form.Control {...register("title")} type="text" placeholder="e.g. The Matrix"/>
                </Form.Group>
                <Form.Group as={Col} className="mb-1">
                    <strong><Form.Label>Director</Form.Label></strong>
                    <Form.Control {...register("director")} type="text" placeholder="e.g. Bernardo Bertolucci" />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className="mb-1">
                    <strong><Form.Label>Cast</Form.Label></strong>
                    <Form.Control {...register("cast")} type="text" placeholder="e.g. John Lone, Ruocheng Ying"/>
                </Form.Group>
            </Row>
            <Row>
                <Form.Label className='mt-2'><strong>Run Time</strong> <span>( *insert minutes )</span></Form.Label>
                <Form.Group as={Col} className="mb-1">
                    <Form.Control {...register("runTimeFrom")} type="number" placeholder="From"/>
                </Form.Group>
                <Form.Group as={Col} className="mb-1">
                    <Form.Control {...register("runTimeTo")} type="number" placeholder="To"/>
                </Form.Group>
            </Row>
            <Row className='mt-3'>
                <Form.Group>
                    <strong><Form.Label>Genre</Form.Label></strong>
                    {/* Link register with each checkbox value */}
                    <div className="mb-3">                
                    {genres.map( (gen,index) => (
                        <Form.Check
                            {...register("genre")}
                            value={gen}
                            key={index}
                            type="checkbox"
                            id={index}
                            label={gen}
                            inline
                        />                            
                    ))}
                    </div>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col}>
                    <strong><Form.Label>Country</Form.Label></strong>
                    <Form.Select {...register("country")} name="country" className="mb-3">
                        {countries.map((country,index) => {
                            return <option key={index} value={country}>{country}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col}>
                    <strong><Form.Label>Language</Form.Label></strong>
                    <Form.Select {...register("language")} name="language" className="mb-3">
                        {languages.map((country,index) => {
                            return <option key={index} value={country}>{country}</option>
                        })}
                    </Form.Select>
                </Form.Group>                
            </Row>
            <Row>
                <Form.Group as={Col}>
                    <strong><Form.Label>Release Date</Form.Label></strong><br />
                    <h6>From</h6>
                    <Form.Control {...register("fromDate")} type="date" className="mb-3"/>
                    <h6>To</h6>
                    <Form.Control {...register("toDate")} type="date" className="mb-3"/>
                </Form.Group>
                <Form.Group as={Col}>
                    <strong><Form.Label>IMDB Rate</Form.Label></strong><br />
                    <h6>From</h6>
                    <Form.Select {...register("fromRate")} className="mb-3" placeholder='From'>
                        {ranges.map((range,index) => {
                            return <option key={index} value={range}>{range}</option>
                        })}
                    </Form.Select>
                    <h6>To</h6>
                    {/*  */}
                    <Form.Select {...register("toRate")} className="mb-3" placeholder='To'>
                        {ranges.map((range,index) => {
                            return <option key={index} value={range}>{range}</option>
                        })}
                    </Form.Select>
                </Form.Group>
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