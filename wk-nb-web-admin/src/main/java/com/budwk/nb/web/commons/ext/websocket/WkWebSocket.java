package com.budwk.nb.web.commons.ext.websocket;

import com.budwk.nb.commons.constants.RedisConstant;
import org.nutz.integration.jedis.JedisAgent;
import org.nutz.integration.jedis.pubsub.PubSub;
import org.nutz.integration.jedis.pubsub.PubSubService;
import org.nutz.ioc.Ioc;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.log.Log;
import org.nutz.log.Logs;
import org.nutz.plugins.mvc.websocket.AbstractWsEndpoint;
import org.nutz.plugins.mvc.websocket.NutWsConfigurator;
import org.nutz.plugins.mvc.websocket.WsHandler;
import redis.clients.jedis.Jedis;

import javax.websocket.EndpointConfig;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/websocket", configurator = NutWsConfigurator.class)
@IocBean(create = "init") // 使用NutWsConfigurator的必备条件
public class WkWebSocket extends AbstractWsEndpoint implements PubSub {
    protected static final Log log = Logs.get();
    @Inject
    protected PubSubService pubSubService;
    @Inject
    protected JedisAgent jedisAgent;
    @Inject("refer:$ioc")
    protected Ioc ioc;
    @Inject("java:$conf.getInt('shiro.session.cache.redis.ttl')")
    private int RedisKeySessionTTL;

    public WsHandler createHandler(Session session, EndpointConfig config) {
        return ioc.get(WkWsHandler.class);
    }

    public void init() {
        roomPrefix = RedisConstant.REDIS_KEY_ADMIN_WS_ROME;
        roomProvider = new WkJedisRoomProvider(jedisAgent,RedisKeySessionTTL);
        try (Jedis jedis = jedisAgent.getResource()) {
            for (String key : jedis.keys(RedisConstant.REDIS_KEY_ADMIN_WS_ROME + "*")) {
                switch (jedis.type(key)) {
                    case "none":
                        break;
                    case "set":
                        break;
//                    default:
//                        jedis.del(key);
                }
            }
        }
        pubSubService.reg(RedisConstant.REDIS_KEY_ADMIN_WS_ROME + "*", this);
    }


    public void onMessage(String channel, String message) {
        log.debugf("GET PubSub channel=%s msg=%s", channel, message);
        each(channel, (index, session, length) -> session.getAsyncRemote().sendText(message));
    }
}
