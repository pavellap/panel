import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Delete from '@material-ui/icons/Delete'
import {
    Button, Accordion, AccordionSummary, Tooltip,
    ListSubheader, ListItem, ListItemText, TextField,
    ListItemSecondaryAction, Switch, Typography
} from "@material-ui/core";
import {addConfig, chooseConfig, deleteConfig} from "../../Redux/Actions/ConfigActions";
import {Container, StyledDetails, IconWrapper, StyledList, LoaderWrapper} from "./StylesConfig";
import Loader from "../UI/Loader";


function Config(props) {
    const {currentConfig, configs, addConfig, chooseConfig, deleteConfig, isLoading} = props;

    useEffect(() => {
        console.log("Отрисовали конфигурации со значениями:", props)
    })

    return (
        <Container>
            {console.log("Рендерим конфиги...")}
            <div>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Текущая конфигурация: {currentConfig ? currentConfig.id : null}</Typography>
                    </AccordionSummary>
                    <StyledDetails>
                        {isLoading ? <LoaderWrapper><Loader/></LoaderWrapper> :
                            <React.Fragment>
                                <div style={{display: 'flex'}}>
                                    <TextField variant='outlined'
                                               label='Промежуток показа'
                                               value={currentConfig ? currentConfig.form_time : ""}/>
                                </div>
                                <StyledList subheader={<ListSubheader>Доступные конфигурации</ListSubheader>}>
                                    {configs && configs.map(item => (
                                        <ListItem button key={item.id}
                                                  selected={item.id === currentConfig.id}
                                                  onClick={() => chooseConfig(item)}
                                        >
                                            <ListItemText>
                                                Конфигурация: {item.id}
                                            </ListItemText>
                                            <ListItemSecondaryAction>
                                                <IconWrapper>
                                                    <Switch checked={item.active}/>
                                                    <Tooltip title='Удаление данной конфигурации' placement='right'>
                                                        <Delete color='action'
                                                                cursor='pointer'
                                                                onClick={() => deleteConfig(item.id)}
                                                        />
                                                    </Tooltip>
                                                </IconWrapper>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                    <div style={{display: 'flex',
                                        justifyContent: 'center',
                                        paddingTop: 10
                                    }}>
                                        <Button
                                            variant='contained'
                                            color='primary'>
                                            Сохранить изменения
                                        </Button>
                                    </div>
                                </StyledList>
                            </React.Fragment>
                        }
                    </StyledDetails>
                </Accordion>
            </div>
            <Button variant='contained' color='primary'
                    style={{marginRight: 150}} onClick={addConfig}>
                Добавить новую конфигурацию
            </Button>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        currentConfig: state.config.currentConfig,
        configs: state.config.configs,
        isLoading: state.config.handlingQuery
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addConfig: () => dispatch(addConfig()),
        chooseConfig: config => dispatch(chooseConfig(config)),
        deleteConfig: config => dispatch(deleteConfig(config))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Config)