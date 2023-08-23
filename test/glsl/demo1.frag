

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;// 画布的宽高
uniform vec2 u_mouse;// 鼠标的位置（像素）
uniform float u_time;// 时间

float det=.001;
vec3 pos;

mat2 rot(float a){
        float s=sin(a),c=cos(a);
        return mat2(c,s,-s,c);
}

float de(vec3 p){
        p*=1.2-length(sin(p+u_time))*.25;
        p.xz*=rot(u_time+p.y*.5);
        p.yz*=rot(u_time+p.x*.5);
        pos=p;
        float d=length(p)-3.;
        d=max(d,-length(p)+2.5);
        vec3 s=sin(p*3.);
        d+=length(s*s)*.27;
        d=min(d,length(p)-1.5);
        return d*.4;
}

vec3 normal(vec3 p){
        vec2 e=vec2(0.,det*2.);
        return normalize(vec3(de(p+e.yxx),de(p+e.xyx),de(p+e.xxy))-de(p));
}

vec3 shade(vec3 p,vec3 dir,vec3 n){
        vec3 ldir=normalize(vec3(-.720,.980,-1.));
        float amb=.15;
        float dif=max(0.,dot(ldir,n))*.9;
        vec3 col=abs(mix(sin(pos),cos(pos),pos.x*.5));
        return(amb+dif)*col;
    
}

vec3 march(vec3 from,vec3 dir){
        float td=0.,d=0.,ref=0.,maxdist=45.;
        vec3 col=vec3(0.),colref=col,p=from;
        for(int i=0;i<100;i++){
                p+=d*dir;
                d=de(p);
                if(d<det&&ref>0.||td>maxdist)break;
                if(d<det&&ref<1.&&(length(fract(pos)-.5)<.6||length(pos)>1.6)){
                        ref=1.;
                        vec3 n=normal(p);
                        colref+=shade(p,dir,n);
                        dir=reflect(dir,n);
                        p+=dir*.9;
                }
                td+=d;
        }
        if(d>det){
                td=maxdist;
                p=dir*maxdist;
                col+=smoothstep(.15,.0,abs(fract(p.y*.1)-.5))*.5;
                col+=smoothstep(.15,.0,abs(fract(p.x*.1)-.5))*.5;
        }else{
                vec3 n=normal(p);
                col=shade(p,dir,n);
        }
        col=mix(col,colref,ref*.7);
        col=mix(col,vec3(1.),td/maxdist*.3);
        return col;
}
void main()
{
        vec2 uv=(gl_FragCoord.xy-u_resolution.xy*.5)/u_resolution.y;
        vec2 uv2=gl_FragCoord.xy/u_resolution.xy-.5;
        vec3 from=vec3(0.,0.,-8.);
        vec3 dir=normalize(vec3(uv,1.));
        // from.xz*=rot(u_time*.5-2.);
        // dir.xz*=rot(u_time*.5-2.);
    
        vec3 col=march(from,dir);
        col*=smoothstep(.5,.1,abs(uv2.x));
        gl_FragColor=vec4(col,1.);
}

// precision mediump float;

// uniform vec2 u_resolution;
// uniform float u_time;

// void main() {
    //     // 使用坐标和时间来生成颜色
    //     vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    //     vec3 color = vec3(sin(u_time), uv);
    
    //     // 输出颜色
    //     gl_FragColor = vec4(color, 1.0);
// }
