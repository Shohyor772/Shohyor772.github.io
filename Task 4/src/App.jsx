import React, { useState } from 'react'; 
import {
  Layout,
  Menu,
  Card,
  Table,
  Form,
  Input,
  Button,
  Select,
  Radio,
  DatePicker,
  Checkbox,
  Row,
  Col,
  Typography,
  Space,
  Divider,
  Image
} from 'antd';
import {
  LinkOutlined,
  TableOutlined,
  FormOutlined,
  ContactsOutlined
} from '@ant-design/icons';

import logo from './images/logo.png';
import kubguImage from './images/image.jpg';
import mapImage from './images/image.jpg';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const App = () => {
  const [form] = Form.useForm();
  const [currentSection, setCurrentSection] = useState('links');

  const tableData = [
    {
      key: '1',
      number: '1',
      name: 'КубГУ HTTP',
      type: 'Абсолютная',
      status: 'Активна'
    },
    {
      key: '2',
      number: '2',
      name: 'КубГУ HTTPS',
      type: 'Абсолютная',
      status: 'Активна'
    },
    {
      key: '3',
      number: '3',
      name: 'Относительные ссылки',
      type: 'Относительная',
      status: 'Активна'
    },
    {
      key: '4',
      number: '3',
      name: 'Фрагменты',
      type: 'Якорная',
      status: 'Активна'
    },
    {
      key: '5',
      number: '4',
      name: 'FTP ссылка',
      type: 'FTP',
      status: 'Тестовая'
    },
    {
      key: '6',
      number: '5',
      name: 'Nofollow',
      type: 'SEO',
      status: 'Активна'
    }
  ];

  const tableColumns = [
    {
      title: '№',
      dataIndex: 'number',
      key: 'number'
    },
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Тип ссылки',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status'
    }
  ];

  const menuItems = [
    {
      key: 'links',
      icon: React.createElement(LinkOutlined),
      label: 'Ссылки'
    },
    {
      key: 'table',
      icon: React.createElement(TableOutlined),
      label: 'Таблица'
    },
    {
      key: 'form',
      icon: React.createElement(FormOutlined),
      label: 'Форма'
    },
    {
      key: 'contacts',
      icon: React.createElement(ContactsOutlined),
      label: 'Контакты'
    }
  ];

  const handleMenuClick = ({ key }) => {
    setCurrentSection(key);
    const element = document.getElementById(key);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
    alert('Форма успешно отправлена!');
  };

  return (
    <Layout className="site-layout">
      <Header>
        <Row justify="space-between" align="middle">
          <Col xs={24} sm={12}>
            <div className="logo-container">
              <div className="logo">
                <img 
                  src={logo} 
                  alt="Логотип сайта" 
                  style={{
                    width: '100%', 
                    height: '100%', 
                    borderRadius: '50%'
                  }}
                />
              </div>
              <Title level={4} style={{ color: 'white', margin: 0 }}>
                Сайт с ссылочками
              </Title>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[currentSection]}
                items={menuItems}
                onClick={handleMenuClick}
                className="mobile-nav"
                style={{ 
                  justifyContent: 'flex-end',
                  borderBottom: 'none'
                }}
              />
            </div>
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: '24px' }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={{ order: 1, span: 24 }}>
            <Card 
              id="links"
              title={
                <Space>
                  <LinkOutlined />
                  <span>Требуемые гиперссылки</span>
                </Space>
              }
              className="links-section"
            >
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a href="http://kubsu.ru" target="_blank" rel="noopener noreferrer">
                    КубГУ (HTTP)
                  </a>
                  <a href="https://kubsu.ru" target="_blank" rel="noopener noreferrer">
                    КубГУ (HTTPS)
                  </a>
                  <a href="about.html">Внутренняя страница</a>
                  <a href="index.html">Ссылка на главную страницу</a>
                  <a href="#form">Фрагмент текущей страницы</a>
                  <a 
                    href="https://www.google.com/search?q=КубГУ+Краснодар&num=5&hl=ru" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Поиск КубГУ с 3 параметрами
                  </a>
                </div>

                <Divider />

                <div style={{ textAlign: 'center' }}>
                  <a href="https://kubsu.ru" target="_blank" rel="noopener noreferrer">
                    <Image
                      src={kubguImage}
                      alt="Логотип КубГУ"
                      preview={false}
                      width={250}
                      height={150}
                      style={{ 
                        borderRadius: '8px'
                      }}
                    />
                  </a>
                </div>

                <Divider />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a href="https://kubsu.ru?id=12345" target="_blank" rel="noopener noreferrer">
                    КубГУ по id
                  </a>
                  <a href="fileInFile.html">Файл в текущем каталоге</a>
                  <a href="about/forCatalog.html">Каталог в about</a>
                  <a href="../about.html">Уровень выше</a>
                  <a href="../../about.html">Уровень на два уровня выше</a>
                  <a href="#void">Пустой href</a>
                </div>

                <Divider />

                <Paragraph>
                  Просто текст, а далее - ссылка:{' '}
                  <a href="https://kubsu.ru" target="_blank" rel="noopener noreferrer">
                    Кубанский государственный университет
                  </a>
                </Paragraph>

                <Divider />

                <div>
                  <Title level={5}>Нумерованный список ссылок:</Title>
                  <ol className="numbered-links">
                    <li>
                      <a 
                        href="https://kubsu.ru" 
                        title="Официальный сайт Кубанского государственного университета"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        КубГУ
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://kubsu.ru/ru/university/departments" 
                        title="Список всех факультетов и кафедр университета"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Факультеты КубГУ
                      </a>
                    </li>
                    <li>
                      <a 
                        href="https://kubsu.ru/ru/abiturient" 
                        title="Информация для абитуриентов: правила приема, документы, сроки"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Абитуриентам
                      </a>
                    </li>
                  </ol>
                </div>

                <Divider />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <span style={{ color: '#a0aec0' }}>Ссылка без href</span>
                  <a 
                    href="https://kubsu.ru" 
                    rel="nofollow" 
                    target="_blank" 
                    style={{ color: '#a0aec0' }}
                  >
                    Запрет на переход поисковикам
                  </a>
                  <a 
                    href="https://kubsu.ru" 
                    rel="noindex" 
                    target="_blank" 
                    style={{ color: '#a0aec0', fontStyle: 'italic' }}
                  >
                    Запрет для индексации
                  </a>
                  
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <Image 
                        src={mapImage} 
                        alt="Интерактивная карта" 
                        width={300}
                        height={200}
                        preview={false}
                        style={{ borderRadius: '8px' }}
                      />
                      <a 
                        href="https://kubsu.ru" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          position: 'absolute',
                          top: '0px',
                          left: '0px',
                          width: '150px',
                          height: '150px',
                          cursor: 'pointer',
                          opacity: 0
                        }}
                        title="Перейти на КубГУ"
                      />
                      <a 
                        href="https://google.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          position: 'absolute',
                          top: '25px',
                          left: '175px',
                          width: '100px',
                          height: '100px',
                          borderRadius: '50%',
                          cursor: 'pointer',
                          opacity: 0
                        }}
                        title="Перейти на Google"
                      />
                    </div>
                    <div style={{ marginTop: '10px', color: '#666' }}>
                      Нажмите на области изображения (левый квадрат и правый круг)
                    </div>
                  </div>

                  <a href="ftp://student:password123@ftp.kubsu.ru/public/documents/study_materials.zip">
                    FTP с авторизацией
                  </a>
                </div>
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={{ order: 2, span: 24 }}>
            <Card 
              id="table"
              title={
                <Space>
                  <TableOutlined />
                  <span>Таблица данных</span>
                </Space>
              }
              className="table-section"
            >
              <Table
                columns={tableColumns}
                dataSource={tableData}
                pagination={false}
                scroll={{ x: true }}
                title={() => 'Типы ссылок на сайте'}
              />
            </Card>
          </Col>

          <Col xs={24} lg={{ order: 3, span: 24 }}>
            <Card 
              id="form"
              title={
                <Space>
                  <FormOutlined />
                  <span>Форма</span>
                </Space>
              }
              className="form-section"
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                size="large"
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="ФИО"
                      name="fio"
                      rules={[{ required: true, message: 'Пожалуйста, введите ФИО' }]}
                    >
                      <Input placeholder="Иванов Иван Иванович" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Телефон"
                      name="phone"
                      rules={[{ required: true, message: 'Пожалуйста, введите телефон' }]}
                    >
                      <Input placeholder="+7(999)999-99-99" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: 'Пожалуйста, введите email' },
                        { type: 'email', message: 'Введите корректный email' }
                      ]}
                    >
                      <Input placeholder="exampleEmail@mail.ru" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Дата рождения"
                      name="birthdate"
                      rules={[{ required: true, message: 'Пожалуйста, выберите дату рождения' }]}
                    >
                      <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Пол"
                  name="gender"
                  rules={[{ required: true, message: 'Пожалуйста, выберите пол' }]}
                >
                  <Radio.Group>
                    <Radio value="male">Мужской</Radio>
                    <Radio value="female">Женский</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Любимый язык программирования"
                  name="languages"
                  rules={[{ required: true, message: 'Пожалуйста, выберите язык программирования' }]}
                >
                  <Select mode="multiple" placeholder="Выберите языки программирования">
                    <Option value="pascal">Pascal</Option>
                    <Option value="c">C</Option>
                    <Option value="cpp">C++</Option>
                    <Option value="javascript">JavaScript</Option>
                    <Option value="php">PHP</Option>
                    <Option value="python">Python</Option>
                    <Option value="java">Java</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Биография"
                  name="bio"
                >
                  <TextArea
                    rows={4}
                    placeholder="Расскажите о себе..."
                  />
                </Form.Item>

                <Form.Item
                  name="contract"
                  valuePropName="checked"
                  rules={[{ required: true, message: 'Необходимо согласие с контрактом' }]}
                >
                  <Checkbox>
                    С контрактом ознакомлен(а)
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large">
                    Сохранить
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>

      <Footer id="contacts" className="footer">
        <div style={{ 
          textAlign: 'left', 
          padding: '0 24px',
          width: '100%',
          maxWidth: '1900px',
          margin: '0 auto'
        }}>
          <Text style={{ color: 'white' }}>© Владимир 2025</Text>
        </div>
      </Footer>
    </Layout>
  );
};

export default App;