import com.like.dao.CommentMapper;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

/**
 * Created by Like on 2017/4/14.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath*:config/spring-mvc.xml", "classpath*:config/spring-mybatis.xml"})
public class MyTest extends AbstractJUnit4SpringContextTests {

    private static Logger logger = Logger.getLogger(MyTest.class);

    @Resource
    private CommentMapper commentMapper;

    @Test
    public void test() {

    }
}
