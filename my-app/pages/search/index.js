import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import {Form, Row, Col, Button} from 'react-bootstrap'
import {categories, language, country, ranges} from '../../public/searchItem'
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';

export default function AdvancedSearchForm() {
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            title: "",
            directors: "",
            cast: "",
            runTimeFrom: 0,
            runTimeTo: 0,
            genre: [],
            countries: "",
            languages: "",
            fromRate: "",
            toRate: "",
            fromDate: "", 
            toDate: "",
        }
    });

    // console.log("searchHistory: ",searchHistory);
    function queryGenerator(data) {
        let queryStr = "";
        for(const property in data) {
            if ( typeof data[property] === "string" && data[property].length > 0) {
                queryStr += `${property}=${data[property]}&`;
            } 
            else if (
                property === "genre" && 
                data[property].length > 0) {
                data[property].forEach(element => {
                    queryStr += `${property}=${element}&`;
                });
            }
        }
        queryStr = queryStr.substring(0, queryStr.length-1);
        setSearchHistory(current => [...current, queryStr]);
        router.push(`/results?${queryStr}`);
    }

    function submitForm(data, event) {
        queryGenerator(data);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") event.preventDefault();
    }

    return (
        <Form onSubmit={handleSubmit(submitForm)}>
            <Row>
                <Form.Group as={Col} className="mb-1">
                    <strong><Form.Label htmlFor ="title">Title</Form.Label></strong>
                    <Form.Control 
                        id="title" 
                        {...register("title")} 
                        type="text" 
                        placeholder="e.g. The Matrix"
                        onKeyDown ={handleKeyPress}
                    />
                </Form.Group>
                <Form.Group as={Col} className="mb-1">
                    <strong><Form.Label htmlFor ="directors">Directors</Form.Label></strong>
                    <Form.Control 
                        id="directors"
                        {...register("directors")}
                        type="text"
                        placeholder="e.g. Bernardo Bertolucci" 
                        onKeyDown ={handleKeyPress}
                    />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className="mb-1">
                    <strong><Form.Label htmlFor ="cast">Cast</Form.Label></strong>
                    <Form.Control 
                        id="cast"
                        {...register("cast")}
                        type="text"
                        placeholder="e.g. John Lone, Ruocheng Ying"
                        onKeyDown ={handleKeyPress}
                    />
                </Form.Group>
            </Row>
            <Row>
                <Form.Label className='mt-2'><strong>Run Time</strong> <span>( *insert minutes )</span></Form.Label>
                <Form.Group as={Col} className="mb-1">
                    <Form.Label>From</Form.Label>
                    <Form.Control {...register("runTimeFrom",{ min: 0, max: 1000 })} type="number"/>
                    {/* {errors.runTimeFrom?.type === "min" && <span><br />First Name is required</span>}
                    {errors.firstName?.type === "max" && <span><br />First Name is required</span>} */}
                </Form.Group>
                <Form.Group as={Col} className="mb-1">
                    <Form.Label>To</Form.Label>
                    <Form.Control {...register("runTimeTo", { min: 0, max: 1000 })} type="number"/>
                </Form.Group>
            </Row>
            <Row className='mt-3'>
                <Form.Group>
                    <strong><Form.Label>Genre</Form.Label></strong>
                    {/* Link register with each checkbox value */}
                    <div className="mb-3">                
                    {categories.map( (gen,index) => (
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
                    <Form.Select {...register("countries")} name="countries" className="mb-3">
                        {country.map((ctr,index) => {
                            return <option key={index} value={ctr}>{ctr}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col}>
                    <strong><Form.Label>Language</Form.Label></strong>
                    <Form.Select {...register("languages")} name="languages" className="mb-3">
                        {language.map((country,index) => {
                            return <option key={index} value={country}>{country}</option>
                        })}
                    </Form.Select>
                </Form.Group>                
            </Row>
            <Row>
                <Form.Group as={Col}>
                    <strong><Form.Label>Release Date</Form.Label></strong><br />
                    <Form.Label>From</Form.Label>
                    <Form.Control {...register("fromDate")} type="date" className="mb-3"/>
                    <Form.Label>To</Form.Label>
                    <Form.Control {...register("toDate")} type="date" className="mb-3"/>
                </Form.Group>
                <Form.Group as={Col}>
                    <strong><Form.Label>IMDB Rate</Form.Label></strong><br />
                    <Form.Label>From</Form.Label>
                    <Form.Select {...register("fromRate")} className="mb-3" placeholder='From'>
                        {ranges.map((range,index) => {
                            return <option key={index} value={range}>{range}</option>
                        })}
                    </Form.Select>
                    <Form.Label>To</Form.Label>
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
                <Button variant="secondary" type="submit">
                    Submit
                </Button>
                </Col>
            </Row>
        </Form>
    )
}